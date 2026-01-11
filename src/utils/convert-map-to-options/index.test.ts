import { describe, expect, it } from "vitest"

import { convertMapToOptions } from "./index"

describe("convertMapToOptions", () => {
  it("應該將物件轉換為選項陣列", () => {
    const map = {
      apple: "蘋果",
      banana: "香蕉",
      orange: "橘子"
    } as const

    const result = convertMapToOptions(map)

    expect(result).toEqual([
      { value: "apple", label: "蘋果" },
      { value: "banana", label: "香蕉" },
      { value: "orange", label: "橘子" }
    ])
  })

  it("應該排除指定的鍵", () => {
    const map = {
      apple: "蘋果",
      banana: "香蕉",
      orange: "橘子"
    } as const

    const result = convertMapToOptions(map, ["banana"])

    expect(result).toEqual([
      { value: "apple", label: "蘋果" },
      { value: "orange", label: "橘子" }
    ])
  })

  it("應該排除多個指定的鍵", () => {
    const map = {
      apple: "蘋果",
      banana: "香蕉",
      orange: "橘子",
      grape: "葡萄"
    } as const

    const result = convertMapToOptions(map, ["banana", "grape"])

    expect(result).toEqual([
      { value: "apple", label: "蘋果" },
      { value: "orange", label: "橘子" }
    ])
  })

  it("應該處理空物件", () => {
    const map = {} as const

    const result = convertMapToOptions(map)

    expect(result).toEqual([])
  })

  it("應該處理沒有排除項的情況", () => {
    const map = {
      yes: "是",
      no: "否"
    } as const

    const result = convertMapToOptions(map)

    expect(result).toEqual([
      { value: "yes", label: "是" },
      { value: "no", label: "否" }
    ])
  })

  it("應該處理所有項目都被排除的情況", () => {
    const map = {
      apple: "蘋果",
      banana: "香蕉"
    } as const

    const result = convertMapToOptions(map, ["apple", "banana"])

    expect(result).toEqual([])
  })

  it("應該處理排除不存在的鍵", () => {
    const map = {
      apple: "蘋果",
      banana: "香蕉"
    } as const

    // @ts-expect-error - 測試執行時行為
    const result = convertMapToOptions(map, ["orange"])

    expect(result).toEqual([
      { value: "apple", label: "蘋果" },
      { value: "banana", label: "香蕉" }
    ])
  })

  it("應該處理訂單狀態的真實場景", () => {
    const orderStatusMap = {
      pending: "待付款",
      processing: "處理中",
      shipped: "已出貨",
      completed: "已完成",
      cancelled: "已取消",
      all: "全部"
    } as const

    const result = convertMapToOptions(orderStatusMap, ["all"])

    expect(result).toEqual([
      { value: "pending", label: "待付款" },
      { value: "processing", label: "處理中" },
      { value: "shipped", label: "已出貨" },
      { value: "completed", label: "已完成" },
      { value: "cancelled", label: "已取消" }
    ])
  })
})
