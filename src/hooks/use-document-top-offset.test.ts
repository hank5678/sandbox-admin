import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import useDocumentTopOffset from "./use-document-top-offset"

describe("useDocumentTopOffset", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  const createMockElement = (offsetTop: number, parent: unknown = null) => ({
    offsetTop,
    offsetParent: parent
  })

  it("應該能正確累加所有父層的 offsetTop", () => {
    const grandparent = createMockElement(100)
    const parent = createMockElement(50, grandparent)
    const element = createMockElement(20, parent)

    const { result } = renderHook(() => useDocumentTopOffset())

    act(() => {
      // @ts-expect-error: 模擬 DOM 屬性
      result.current.ref.current = element
      result.current.refresh()
    })

    expect(result.current.value).toBe(170)
  })

  it("在 unmount 時應該移除監聽器並取消節流", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener")
    const { unmount } = renderHook(() => useDocumentTopOffset())

    unmount()

    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function))
  })

  it("如果沒有 ref 元素，value 應該保持為 0", () => {
    const { result } = renderHook(() => useDocumentTopOffset())

    act(() => {
      result.current.refresh()
    })

    expect(result.current.value).toBe(0)
  })
})
