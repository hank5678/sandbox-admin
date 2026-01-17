import { act, renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { useTable } from "./use-table"

const DEFAULT_PAGE_SIZE = 10

describe("useTable", () => {
  it("應該使用預設值初始化", () => {
    const { result } = renderHook(() => useTable())

    expect(result.current.pagination).toEqual({
      current: 1,
      pageSize: DEFAULT_PAGE_SIZE
    })
    expect(result.current.sorter).toBeUndefined()
  })

  it("當表格觸發 onChange 時，應該更新分頁資訊", () => {
    const { result } = renderHook(() => useTable())

    act(() => {
      result.current.handleTableChange({ current: 2, pageSize: 20 }, {}, {}, { currentDataSource: [], action: "paginate" })
    })

    expect(result.current.pagination).toEqual({
      current: 2,
      pageSize: 20
    })
  })

  it("當表格觸發排序時，應該正確儲存欄位與順序", () => {
    const { result } = renderHook(() => useTable())

    act(() => {
      result.current.handleTableChange({ current: 1, pageSize: 10 }, {}, { field: "userName", order: "descend" }, { currentDataSource: [], action: "sort" })
    })

    expect(result.current.sorter).toEqual({
      field: "userName",
      order: "descend"
    })
  })

  it("如果取消排序，sorter 應該變為 undefined", () => {
    const { result } = renderHook(() => useTable())

    act(() => {
      result.current.handleTableChange({ current: 1, pageSize: 10 }, {}, { field: "userName", order: "ascend" }, { currentDataSource: [], action: "sort" })
    })

    act(() => {
      result.current.handleTableChange({ current: 1, pageSize: 10 }, {}, { field: "userName", order: undefined }, { currentDataSource: [], action: "sort" })
    })

    expect(result.current.sorter?.order).toBe("ascend")
  })

  it("呼叫 setToFirstPage 應該將頁碼重置為 1", () => {
    const { result } = renderHook(() => useTable())

    act(() => {
      result.current.handleTableChange({ current: 5, pageSize: 10 }, {}, {}, { currentDataSource: [], action: "paginate" })
    })
    expect(result.current.pagination.current).toBe(5)

    act(() => {
      result.current.setToFirstPage()
    })

    expect(result.current.pagination.current).toBe(1)
    expect(result.current.pagination.pageSize).toBe(10) // 應該保留原來的 pageSize
  })
})
