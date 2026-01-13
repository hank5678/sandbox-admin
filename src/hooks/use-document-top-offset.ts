import { throttle } from "lodash-es"
import { useCallback, useLayoutEffect, useRef, useState } from "react"

/** 計算並追蹤 DOM 元素距離頁面頂部的高度偏移數值 */
const useDocumentTopOffset = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T | null>(null)

  const [value, setValue] = useState(0)
  const computeOffset = useCallback(() => {
    let el = ref.current
    if (!el) return

    let totalOffset = 0

    // 向上遞迴累加所有父層的偏移量
    while (el) {
      totalOffset += el.offsetTop
      // 取得下一個定位父元素
      el = el.offsetParent as T | null
    }

    setValue(totalOffset)
  }, [])

  useLayoutEffect(() => {
    const updateOffset = () => computeOffset()

    const throttledUpdate = throttle(updateOffset, 500, {
      leading: true,
      trailing: true
    })

    updateOffset()

    window.addEventListener("resize", throttledUpdate)

    return () => {
      window.removeEventListener("resize", throttledUpdate)
      throttledUpdate.cancel()
    }
  }, [computeOffset])

  return {
    ref,
    value,
    refresh: computeOffset
  }
}

export default useDocumentTopOffset
