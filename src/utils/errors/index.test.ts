import { describe, expect, it } from "vitest"

import { getErrorMessage } from "./index"

describe("getErrorMessage", () => {
  it("應該為標準 Error 物件返回字串", () => {
    const error = new Error("測試錯誤")
    const message = getErrorMessage(error)
    expect(typeof message).toBe("string")
    expect(message.length).toBeGreaterThan(0)
  })

  it("應該為字串類型的錯誤返回字串", () => {
    const message = getErrorMessage("測試字串錯誤")
    expect(typeof message).toBe("string")
  })

  it("應該為未知錯誤返回字串", () => {
    const message = getErrorMessage(null)
    expect(typeof message).toBe("string")
    expect(message.length).toBeGreaterThan(0)
  })
})
