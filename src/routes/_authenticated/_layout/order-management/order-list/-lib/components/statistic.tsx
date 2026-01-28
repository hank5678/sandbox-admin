import { Descriptions, type DescriptionsProps } from "antd"

import { formatCurrency } from "@/utils/format-currency"

interface Props {
  totalOrders?: number
  totalAmount?: number
  averageOrderAmount?: number
  pendingOrderCount?: number
  processingOrderCount?: number
  shippedOrderCount?: number
  completedOrderCount?: number
  cancelledOrderCount?: number
}

const Statistic = (props: Props) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "totalOrders",
      label: "訂單總數量",
      children: formatCurrency(props.totalOrders, { showSymbol: false })
    },
    {
      key: "totalAmount",
      label: "訂單總金額",
      children: formatCurrency(props.totalAmount)
    },
    {
      key: "averageOrderAmount",
      label: "平均訂單金額",
      children: formatCurrency(props.averageOrderAmount)
    },
    {
      key: "pendingOrderCount",
      label: "待付款訂單數",
      children: formatCurrency(props.pendingOrderCount, { showSymbol: false })
    },
    {
      key: "processingOrderCount",
      label: "處理中訂單數",
      children: formatCurrency(props.processingOrderCount, { showSymbol: false })
    },
    {
      key: "shippedOrderCount",
      label: "已出貨訂單數",
      children: formatCurrency(props.shippedOrderCount, { showSymbol: false })
    },
    {
      key: "completedOrderCount",
      label: "已完成訂單數",
      children: formatCurrency(props.completedOrderCount, { showSymbol: false })
    },
    {
      key: "cancelledOrderCount",
      label: "已取消訂單數",
      children: formatCurrency(props.cancelledOrderCount, { showSymbol: false })
    }
  ]
  return <Descriptions size="small" items={items} column={4} bordered />
}

export { Statistic }
