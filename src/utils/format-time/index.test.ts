import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { type FormatTimeType, formatTime } from "./index"

const FIXED_TIMESTAMP = 1769322605000 // 2026/01/25 14:30:05 +0800
const FIXED_TIMESTAMP_SECONDS = Math.floor(FIXED_TIMESTAMP / 1000)

describe("formatTime", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("時間戳記處理", () => {
    it("應該接受毫秒時間戳記", () => {
      const result = formatTime(FIXED_TIMESTAMP, { timezone: "+0800" })
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/)
    })

    it("應該接受秒時間戳記", () => {
      const result = formatTime(FIXED_TIMESTAMP_SECONDS, { timezone: "+0800" })
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/)
    })

    it("應該接受字串格式的時間戳記", () => {
      const result = formatTime(String(FIXED_TIMESTAMP), { timezone: "+0800" })
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/)
    })
  })

  describe("格式類型 - YEAR_TO_SECOND（預設）", () => {
    it("應該格式化為年/月/日 時:分:秒", () => {
      const result = formatTime(FIXED_TIMESTAMP, { timezone: "+0800" })
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/)
      expect(result).toBe("2026/01/25 14:30:05")
    })

    it("未指定類型時應該使用 YEAR_TO_SECOND 為預設", () => {
      const result = formatTime(FIXED_TIMESTAMP, { timezone: "+0800" })
      expect(result).toBe("2026/01/25 14:30:05")
    })
  })

  describe("格式類型 - YEAR_MONTH_DAY", () => {
    it("應該只格式化為年/月/日", () => {
      const result = formatTime(FIXED_TIMESTAMP, { type: "YEAR_MONTH_DAY", timezone: "+0800" })
      expect(result).toBe("2026/01/25")
    })
  })

  describe("格式類型 - MONTH_DAY", () => {
    it("應該只格式化為月/日", () => {
      const result = formatTime(FIXED_TIMESTAMP, { type: "MONTH_DAY", timezone: "+0800" })
      expect(result).toBe("01/25")
    })
  })

  describe("格式類型 - MONTH_TO_SECOND", () => {
    it("應該格式化為月/日 時:分:秒", () => {
      const result = formatTime(FIXED_TIMESTAMP, { type: "MONTH_TO_SECOND", timezone: "+0800" })
      expect(result).toBe("01/25 14:30:05")
    })
  })

  describe("格式類型 - HOUR_MINUTE_SECOND", () => {
    it("應該只格式化為時:分:秒", () => {
      const result = formatTime(FIXED_TIMESTAMP, { type: "HOUR_MINUTE_SECOND", timezone: "+0800" })
      expect(result).toBe("14:30:05")
    })
  })

  describe("格式類型 - HOUR_MINUTE", () => {
    it("應該只格式化為時:分", () => {
      const result = formatTime(FIXED_TIMESTAMP, { type: "HOUR_MINUTE", timezone: "+0800" })
      expect(result).toBe("14:30")
    })
  })

  describe("格式類型 - RELATIVE", () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    it("同一天應該顯示 '今天 時:分'", () => {
      // 設定現在時間為 2026/01/25 15:00:00 UTC
      vi.setSystemTime(new Date("2026-01-25T15:00:00Z"))
      const result = formatTime(FIXED_TIMESTAMP, { type: "RELATIVE", timezone: "+0800" })
      expect(result).toBe("今天 14:30")
    })

    it("前一天應該顯示 '昨天 時:分'", () => {
      // 設定現在時間為 2026/01/26 10:00:00 UTC
      vi.setSystemTime(new Date("2026-01-26T10:00:00Z"))
      const result = formatTime(FIXED_TIMESTAMP, { type: "RELATIVE", timezone: "+0800" })
      expect(result).toBe("昨天 14:30")
    })

    it("前兩天應該顯示 '前天 時:分'", () => {
      // 設定現在時間為 2026/01/27 10:00:00 UTC
      vi.setSystemTime(new Date("2026-01-27T10:00:00Z"))
      const result = formatTime(FIXED_TIMESTAMP, { type: "RELATIVE", timezone: "+0800" })
      expect(result).toBe("前天 14:30")
    })

    it("三天以前應該顯示 '月/日 時:分'", () => {
      // 設定現在時間為 2026/01/28 10:00:00 UTC
      vi.setSystemTime(new Date("2026-01-28T10:00:00Z"))
      const result = formatTime(FIXED_TIMESTAMP, { type: "RELATIVE", timezone: "+0800" })
      expect(result).toBe("01/25 14:30")
    })
  })

  describe("時區支持 - IANA 格式", () => {
    it("應該支持 Asia/Taipei 時區", () => {
      const result = formatTime(FIXED_TIMESTAMP, { timezone: "Asia/Taipei" })
      expect(result).toBe("2026/01/25 14:30:05")
    })

    it("應該支持 America/New_York 時區", () => {
      const result = formatTime(FIXED_TIMESTAMP, { timezone: "America/New_York" })
      expect(result).toBe("2026/01/25 01:30:05")
    })

    it("應該支持 Europe/London 時區", () => {
      const result = formatTime(FIXED_TIMESTAMP, { timezone: "Europe/London" })
      expect(result).toBe("2026/01/25 06:30:05")
    })
  })

  describe("時區支持 - UTC offset 格式", () => {
    it("應該支持 +0800 格式", () => {
      const result = formatTime(FIXED_TIMESTAMP, { timezone: "+0800" })
      expect(result).toBe("2026/01/25 14:30:05")
    })

    it("應該支持 -0500 格式", () => {
      const result = formatTime(FIXED_TIMESTAMP, { timezone: "-0500" })
      expect(result).toBe("2026/01/25 01:30:05")
    })

    it("應該支持 UTC 格式", () => {
      const result = formatTime(FIXED_TIMESTAMP, { timezone: "UTC" })
      expect(result).toBe("2026/01/25 06:30:05")
    })
  })

  describe("無效輸入", () => {
    it("undefined 應該返回 '-'", () => {
      const result = formatTime(undefined)
      expect(result).toBe("-")
    })

    it("null 應該返回 '-'", () => {
      const result = formatTime(null)
      expect(result).toBe("-")
    })

    it("NaN 應該返回 '-'", () => {
      const result = formatTime(NaN)
      expect(result).toBe("-")
    })

    it("無效字串應該返回 '-'", () => {
      const result = formatTime("invalid-date")
      expect(result).toBe("-")
    })

    it("Infinity 應該返回 '-'", () => {
      const result = formatTime(Infinity)
      expect(result).toBe("-")
    })

    it("負無窮應該返回 '-'", () => {
      const result = formatTime(-Infinity)
      expect(result).toBe("-")
    })

    it("非常大的無效時間戳記應該返回 '-'", () => {
      const result = formatTime("999999999999999999999")
      expect(result).toBe("-")
    })
  })

  describe("邊界情況", () => {
    it("應該處理年底日期", () => {
      const yearEndTimestamp = new Date("2025-12-31T23:59:59Z").getTime()
      const result = formatTime(yearEndTimestamp, { type: "YEAR_MONTH_DAY", timezone: "UTC" })
      expect(result).toBe("2025/12/31")
    })

    it("應該處理年初日期", () => {
      const yearStartTimestamp = new Date("2026-01-01T00:00:00Z").getTime()
      const result = formatTime(yearStartTimestamp, { type: "YEAR_MONTH_DAY", timezone: "UTC" })
      expect(result).toBe("2026/01/01")
    })

    it("應該處理午夜時間", () => {
      const midnightTimestamp = new Date("2026-01-25T00:00:00Z").getTime()
      const result = formatTime(midnightTimestamp, { type: "HOUR_MINUTE_SECOND", timezone: "UTC" })
      expect(result).toBe("00:00:00")
    })

    it("應該處理 23:59:59 時間", () => {
      const almostMidnightTimestamp = new Date("2026-01-25T23:59:59Z").getTime()
      const result = formatTime(almostMidnightTimestamp, { type: "HOUR_MINUTE_SECOND", timezone: "UTC" })
      expect(result).toBe("23:59:59")
    })
  })

  describe("毫秒與秒的自動判斷", () => {
    it("小於 1e11 的數字應被視為秒", () => {
      const secondsTimestamp = 1700000000
      const result = formatTime(secondsTimestamp, { type: "YEAR_MONTH_DAY", timezone: "UTC" })
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2}$/)
    })

    it("大於 1e11 的數字應被視為毫秒", () => {
      const millisecondsTimestamp = 1700000000000
      const result = formatTime(millisecondsTimestamp, { type: "YEAR_MONTH_DAY", timezone: "UTC" })
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2}$/)
    })

    it("負時間戳記（秒級）應被正確處理", () => {
      const negativeSecondsTimestamp = -86400
      const result = formatTime(negativeSecondsTimestamp, { type: "HOUR_MINUTE_SECOND", timezone: "UTC" })
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/)
    })
  })

  describe("類型檢查", () => {
    it("應該接受所有有效的格式類型", () => {
      const types: FormatTimeType[] = ["YEAR_MONTH_DAY", "YEAR_TO_SECOND", "MONTH_DAY", "MONTH_TO_SECOND", "HOUR_MINUTE_SECOND", "HOUR_MINUTE", "RELATIVE"]

      types.forEach((type) => {
        const result = formatTime(FIXED_TIMESTAMP, { type, timezone: "UTC" })
        expect(result).not.toBe("-")
        expect(typeof result).toBe("string")
      })
    })
  })

  describe("向後相容性", () => {
    it("未指定時區時應該使用系統時區", () => {
      const result = formatTime(FIXED_TIMESTAMP)
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/)
    })

    it("未指定時區的相對時間應該使用系統時區", () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date("2026-01-26T10:00:00Z"))
      const result = formatTime(FIXED_TIMESTAMP, { type: "RELATIVE" })
      expect(typeof result).toBe("string")
      expect(result).not.toBe("-")
      vi.useRealTimers()
    })
  })
})
