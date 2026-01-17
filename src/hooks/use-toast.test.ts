import { renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { useToast } from "./use-toast"

import { getErrorDetails, getErrorMessage } from "@/utils/errors"
import { getSuccessMessage } from "@/utils/successes"

vi.mock("@/utils/errors", () => ({
  getErrorMessage: vi.fn(),
  getErrorDetails: vi.fn()
}))

vi.mock("@/utils/successes", () => ({
  getSuccessMessage: vi.fn()
}))

const mockMessage = {
  success: vi.fn(),
  error: vi.fn()
}
const mockNotification = {}

vi.mock("antd", async (importOriginal) => {
  const actual = await importOriginal<typeof import("antd")>()
  return {
    ...actual,
    App: {
      useApp: () => ({
        message: mockMessage,
        notification: mockNotification
      })
    }
  }
})

describe("useToast", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getSuccessMessage).mockReturnValue("成功啦！")
    vi.mocked(getErrorMessage).mockReturnValue("出錯了")
    vi.mocked(getErrorDetails).mockReturnValue("[ERROR] 出錯了 | Code: 500")
  })

  describe("successMessage", () => {
    it("應該根據 type 取得對應訊息並顯示 success message", () => {
      const { result } = renderHook(() => useToast())

      result.current.successMessage("CREATE")

      expect(getSuccessMessage).toHaveBeenCalledWith({ type: "CREATE" })
      expect(mockMessage.success).toHaveBeenCalledWith("成功啦！")
    })
  })

  describe("errorMessage", () => {
    it("應該顯示翻譯後的錯誤訊息，並在 console 輸出偵錯資訊", () => {
      const { result } = renderHook(() => useToast())
      const dummyError = new Error("Boom!")

      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})

      result.current.errorMessage(dummyError)

      expect(getErrorMessage).toHaveBeenCalledWith(dummyError)
      expect(mockMessage.error).toHaveBeenCalledWith("出錯了")

      expect(getErrorDetails).toHaveBeenCalledWith(dummyError)
      expect(consoleSpy).toHaveBeenCalledWith("[ERROR] 出錯了 | Code: 500")
      expect(consoleSpy).toHaveBeenCalledWith(dummyError)

      consoleSpy.mockRestore()
    })
  })

  it("函式引用應該穩定 (useCallback 驗證)", () => {
    const { result, rerender } = renderHook(() => useToast())
    const firstSuccess = result.current.successMessage
    const firstError = result.current.errorMessage

    rerender()

    expect(result.current.successMessage).toBe(firstSuccess)
    expect(result.current.errorMessage).toBe(firstError)
  })
})
