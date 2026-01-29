import type { TableProps } from "antd"
import { useState } from "react"

import { DEFAULT_PAGE_SIZE } from "@/constants"

export interface Pagination {
  current: number
  pageSize: number
}

export interface Sorter {
  field: string
  order: "ascend" | "descend"
}

const DEFAULT_CURRENT = 1

const useTable = <T extends Record<string, unknown>>() => {
  const [pagination, setPagination] = useState<Pagination>({
    current: DEFAULT_CURRENT,
    pageSize: DEFAULT_PAGE_SIZE
  })
  const [sorter, setSorter] = useState<Sorter>()

  const handleTableChange: TableProps<T>["onChange"] = (pagination, _filters, sorter) => {
    setPagination({ current: pagination.current ?? DEFAULT_CURRENT, pageSize: pagination.pageSize ?? DEFAULT_PAGE_SIZE })
    if (sorter && "field" in sorter && "order" in sorter) {
      const field = sorter.field as string
      const order = sorter.order ?? "ascend"
      if (field) {
        setSorter({ field, order })
      } else {
        setSorter(undefined)
      }
    }
  }

  const setToFirstPage = () => {
    setPagination((prev) => ({
      ...prev,
      current: DEFAULT_CURRENT
    }))
  }

  return {
    pagination,
    sorter,
    handleTableChange,
    setToFirstPage
  }
}

export { useTable }
