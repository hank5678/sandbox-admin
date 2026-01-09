import { describe, expect, it } from "vitest"

import { formatCurrency } from "./index"

describe("formatCurrency", () => {
  describe("基本格式化", () => {
    it("應該正確格式化 TWD 貨幣", () => {
      expect(formatCurrency(123456.789, { precision: 3 })).toBe("NT$ 123,456.789")
    })

    it("應該正確格式化 USD 貨幣", () => {
      expect(formatCurrency(123456.789, { currency: "USD", precision: 3 })).toBe("$1,234.567")
    })

    it("應該正確格式化 IDR 貨幣", () => {
      expect(formatCurrency(123456.789, { currency: "IDR", precision: 3 })).toBe("Rp 123.456,789")
    })

    it("應該正確格式化 VND 貨幣", () => {
      expect(formatCurrency(123456.789, { currency: "VND", precision: 3 })).toBe("₫ 123.456,789")
    })
  })

  describe("空值處理", () => {
    it("金額為 0 時應該返回 '-'", () => {
      expect(formatCurrency(0)).toBe("-")
    })

    it("金額未提供時應該返回 '-'", () => {
      expect(formatCurrency()).toBe("-")
    })
  })

  describe("縮寫符號", () => {
    it("應該維持原值並加上千分位", () => {
      expect(formatCurrency(1000)).toBe("NT$ 1,000")
    })
  })

  describe("是否顯示符號", () => {
    it("showSymbol 為 false 時不應顯示貨幣符號", () => {
      expect(formatCurrency(100000, { showSymbol: false })).toBe("100,000")
    })
  })

  describe("精度控制", () => {
    it("precision 為 0 時不應顯示小數", () => {
      expect(formatCurrency(10050, { currency: "USD", precision: 0 })).toBe("$100")
    })

    it("precision 為 3 時應顯示 3 位小數", () => {
      expect(formatCurrency(10050, { currency: "USD", precision: 3 })).toBe("$100.500")
    })
  })

  describe("邊界情況", () => {
    it("應該正確處理負數", () => {
      expect(formatCurrency(-100000)).toBe("NT$ -100,000")
    })

    it("應該正確處理非常大的數字", () => {
      expect(formatCurrency(999999999999999)).toBe("NT$ 999,999,999,999,999")
    })

    it("應該正確處理小於千的金額", () => {
      expect(formatCurrency(500)).toBe("NT$ 500")
    })

    it("小數部分應該被捨入而非進位", () => {
      expect(formatCurrency(10099, { currency: "USD" })).toBe("$100.99")
    })
  })
})
