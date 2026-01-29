import { createFileRoute } from "@tanstack/react-router"
import { Card, DatePicker, FloatButton, Form, Grid, Input, Select } from "antd"
import { useState } from "react"

import { OrderCard } from "./-internal/components/order-card"
import { Statistic } from "./-internal/components/statistic"
import { type FormValues, INIT_VALUES, schema } from "./-internal/constants"
import { VirtualizedGrid } from "./-internal/features/virtualized-grid"
import { useOrders } from "./-internal/hooks/use-orders"

import { FilterForm } from "@/components/ui/filter-form"

export const Route = createFileRoute("/_authenticated/_layout/order-management/order-list/")({
  component: RouteComponent
})

function RouteComponent() {
  const screens = Grid.useBreakpoint()
  const columns = screens.xxl ? 6 : screens.xl ? 4 : screens.lg ? 3 : screens.md ? 2 : 1
  const [formValues, setFormValues] = useState<FormValues>(INIT_VALUES)
  const { data, statistic } = useOrders(formValues)

  return (
    <>
      <div>
        <Card className="mb-4">
          <FilterForm
            initialValues={INIT_VALUES}
            onFinish={(values) => {
              const parsed = schema.parse(values)
              setFormValues(parsed)
            }}
          >
            <Form.Item
              label="訂單編號"
              name="id"
              rules={[
                {
                  pattern: /^\d*$/,
                  message: "請輸入數字"
                }
              ]}
            >
              <Input type="text" placeholder="請輸入" />
            </Form.Item>
            <Form.Item label="客戶名稱" name="customerName">
              <Input type="text" placeholder="請輸入" />
            </Form.Item>
            <Form.Item label="訂單狀態" name="status">
              <Select placeholder="請選擇">
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="pending">待付款</Select.Option>
                <Select.Option value="processing">處理中</Select.Option>
                <Select.Option value="shipped">已出貨</Select.Option>
                <Select.Option value="completed">已完成</Select.Option>
                <Select.Option value="cancelled">已取消</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="訂單日期" name="orderTime">
              <DatePicker.RangePicker />
            </Form.Item>
          </FilterForm>
        </Card>
        <Card className="mb-4">
          <Statistic {...statistic} />
        </Card>
      </div>
      <VirtualizedGrid items={data} columns={columns} renderItem={(item, colSpan) => <OrderCard key={item.id} item={item} colSpan={colSpan} />} />
      <FloatButton.BackTop type="primary" aria-label="返回頂部" duration={0} />
    </>
  )
}
