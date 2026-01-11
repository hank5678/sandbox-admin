import { describe, expect, it } from "vitest"

import { classNames } from "./"

describe("classNames 工具函式", () => {
  it("基礎功能：應能正確合併多個字串", () => {
    const result = classNames("p-4", "bg-white", "text-black")
    expect(result).toBe("p-4 bg-white text-black")
  })

  it("條件渲染：應根據布林值包含或排除 class", () => {
    const isActive = true
    const isError = false
    const result = classNames("base-style", isActive && "is-active", isError && "is-error")
    expect(result).toBe("base-style is-active")
  })

  it("物件語法：應支持物件形式的條件判斷", () => {
    const result = classNames({
      "btn-primary": true,
      "btn-large": false,
      "opacity-50": true
    })
    expect(result).toBe("btn-primary opacity-50")
  })

  it("Tailwind Merge：應正確解決 Tailwind 樣式衝突（後者優先）", () => {
    // 這裡測試 twMerge 的核心功能：當同時存在 p-4 和 p-8，應只保留 p-8
    const result = classNames("p-4", "p-8")
    expect(result).toBe("p-8")
  })

  it("Tailwind Merge：應處理複雜的衝突（例如顏色或圓角）", () => {
    // 即使順序不在一起，後面的 text-blue-600 也應該覆蓋前面的 text-red-500
    const result = classNames("text-red-500", "font-bold", "text-blue-600")
    expect(result).toBe("font-bold text-blue-600")
  })

  it("陣列處理：應能正確處理傳入的陣列", () => {
    const result = classNames(["flex", "items-center"], "justify-between")
    expect(result).toBe("flex items-center justify-between")
  })

  it("清理無效值：應排除 null, undefined 或空字串", () => {
    const result = classNames("valid-class", null, undefined, false, "")
    expect(result).toBe("valid-class")
  })
})
