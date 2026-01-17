import { act, renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { useToggle } from "./use-toggle"

describe("useToggle", () => {
  it("應該使用預設值初始化", () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current[0]).toBe(false)
  })

  it("應該能接受初始值", () => {
    const { result } = renderHook(() => useToggle(true))
    expect(result.current[0]).toBe(true)
  })

  it("呼叫 toggle 應該切換布林值", () => {
    const { result } = renderHook(() => useToggle(false))

    act(() => {
      result.current[1].toggle()
    })
    expect(result.current[0]).toBe(true)

    act(() => {
      result.current[1].toggle()
    })
    expect(result.current[0]).toBe(false)
  })

  it("呼叫 setTrue 應該將值設為 true", () => {
    const { result } = renderHook(() => useToggle(false))

    act(() => {
      result.current[1].setTrue()
    })
    expect(result.current[0]).toBe(true)

    act(() => {
      result.current[1].setTrue()
    })
    expect(result.current[0]).toBe(true)
  })

  it("呼叫 setFalse 應該將值設為 false", () => {
    const { result } = renderHook(() => useToggle(true))

    act(() => {
      result.current[1].setFalse()
    })
    expect(result.current[0]).toBe(false)
  })

  it("回傳的函式引用應該是穩定的 (useCallback 驗證)", () => {
    const { result, rerender } = renderHook(() => useToggle())

    const beforeToggle = result.current[1].toggle
    const beforeSetTrue = result.current[1].setTrue
    const beforeSetFalse = result.current[1].setFalse

    rerender()

    expect(result.current[1].toggle).toBe(beforeToggle)
    expect(result.current[1].setTrue).toBe(beforeSetTrue)
    expect(result.current[1].setFalse).toBe(beforeSetFalse)
  })
})
