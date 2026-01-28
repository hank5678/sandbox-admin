import dayjs from "dayjs"
import { useMemo } from "react"

import { type Status, statusMap } from "../constants"

export type OrderListItem = {
  id: string
  status: Status
  amount: number
  customerName: string
  orderTime: number
}

export type OrderListFilters = {
  id?: string
  customerName?: string
  status?: "" | Status
  orderTime?: Array<dayjs.Dayjs | undefined> | null
}

const source = Array.from({ length: 500000 }, (_, index) => {
  const id = index + 1
  return {
    id: String(id),
    status: Object.keys(statusMap)[id % 5] as Status,
    amount: ((id * 137) % 5000) + 299,
    customerName: "蔡阿貴",
    orderTime: new Date(2026, id % 12, ((id * 7) % 28) + 1).getTime()
  }
})

const useOrders = (filters?: OrderListFilters) => {
  const filteredData = useMemo<OrderListItem[]>(() => {
    if (!filters) return source
    const keywordId = filters.id?.trim()
    const keywordCustomer = filters.customerName?.trim()
    const status = filters.status
    const [start, end] = filters.orderTime ?? []
    const startTime = start ? start.startOf("day").valueOf() : undefined
    const endTime = end ? end.endOf("day").valueOf() : undefined
    return source.filter((item) => {
      if (keywordId && item.id !== keywordId) return false
      if (keywordCustomer && !item.customerName.includes(keywordCustomer)) return false
      if (status && item.status !== status) return false
      if (startTime !== undefined && item.orderTime < startTime) return false
      if (endTime !== undefined && item.orderTime > endTime) return false
      return true
    })
  }, [filters])

  const statistic = useMemo(
    () => ({
      totalOrders: filteredData.length,
      totalAmount: filteredData.reduce((sum, item) => sum + item.amount, 0),
      averageOrderAmount: filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.amount, 0) / filteredData.length : 0,
      pendingOrderCount: filteredData.filter((item) => item.status === "pending").length,
      processingOrderCount: filteredData.filter((item) => item.status === "processing").length,
      shippedOrderCount: filteredData.filter((item) => item.status === "shipped").length,
      completedOrderCount: filteredData.filter((item) => item.status === "completed").length,
      cancelledOrderCount: filteredData.filter((item) => item.status === "cancelled").length
    }),
    [filteredData]
  )

  return { data: filteredData, statistic }
}

export { useOrders }
