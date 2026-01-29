import { describe, expect, it } from "vitest"

import { getPaginationRange } from "."

describe("getPaginationRange", () => {
  it("應該正確計算第一頁的範圍", () => {
    expect(getPaginationRange(1, 10)).toEqual([0, 9])
  })

  it("應該正確計算第二頁的範圍", () => {
    expect(getPaginationRange(2, 10)).toEqual([10, 19])
  })

  it("應該正確計算不同 size 的範圍", () => {
    expect(getPaginationRange(1, 20)).toEqual([0, 19])
    expect(getPaginationRange(3, 5)).toEqual([10, 14])
  })
})
