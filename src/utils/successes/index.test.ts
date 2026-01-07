import { describe, expect, it } from "vitest"

import { getSuccessMessage } from "./index"

describe("getSuccessMessage", () => {
  it("應該為 CREATE 類型返回字串", () => {
    const message = getSuccessMessage({ type: "CREATE" })
    expect(typeof message).toBe("string")
    expect(message.length).toBeGreaterThan(0)
  })

  it("應該為 UPDATE 類型返回字串", () => {
    const message = getSuccessMessage({ type: "UPDATE" })
    expect(typeof message).toBe("string")
    expect(message.length).toBeGreaterThan(0)
  })

  it("應該為 DELETE 類型返回字串", () => {
    const message = getSuccessMessage({ type: "DELETE" })
    expect(typeof message).toBe("string")
    expect(message.length).toBeGreaterThan(0)
  })
})
