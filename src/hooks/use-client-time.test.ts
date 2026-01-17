import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import useClientTime from "./use-client-time"

describe("useClientTime", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2024-01-01T00:00:00Z"))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("應該返回當前時間戳", () => {
    const { result } = renderHook(() => useClientTime())
    expect(typeof result.current).toBe("number")
    expect(result.current).toBeGreaterThan(0)
  })

  it("應該每秒更新時間", () => {
    const { result } = renderHook(() => useClientTime())
    const initialTime = result.current

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current).toBe(initialTime + 1000)
  })

  it("應該在 unmount 時清除 timer", () => {
    const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval")
    const { unmount } = renderHook(() => useClientTime())

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
