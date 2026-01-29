import { Card, Col, Row, Tag, Typography } from "antd"

import { statusColorMap, statusMap } from "../constants"
import type { OrderListItem } from "../hooks/use-orders"

import { formatCurrency } from "@/utils/format-currency"
import { formatTime } from "@/utils/format-time"

interface OrderCardProps {
  item: OrderListItem
  colSpan: number
}

const OrderCard = ({ item, colSpan }: OrderCardProps) => {
  return (
    <Col key={item.id} span={colSpan}>
      <Card hoverable title={`訂單 #${item.id}`} size="small">
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Typography.Text type="secondary">客戶名稱</Typography.Text>
            <div>{item.customerName}</div>
          </Col>
          <Col span={12}>
            <Typography.Text type="secondary">總金額</Typography.Text>
            <div>{formatCurrency(item.amount)}</div>
          </Col>
          <Col span={12}>
            <Typography.Text type="secondary">訂單狀態</Typography.Text>
            <div>
              <Tag color={statusColorMap[item.status]}>{statusMap[item.status]}</Tag>
            </div>
          </Col>
          <Col span={12}>
            <Typography.Text type="secondary">下單日期</Typography.Text>
            <div>{formatTime(item.orderTime, { type: "YEAR_MONTH_DAY" })}</div>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export { OrderCard }
