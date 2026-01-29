import { useWindowVirtualizer } from "@tanstack/react-virtual"
import { Row } from "antd"
import type { ReactNode } from "react"

import useDocumentTopOffset from "@/hooks/use-document-top-offset"

interface VirtualizedGridProps<T> {
  items: T[]
  columns: number
  renderItem: (item: T, colSpan: number) => ReactNode
}

const VirtualizedGrid = <T,>({ items, columns, renderItem }: VirtualizedGridProps<T>) => {
  const { ref: containerRef, value: scrollMargin } = useDocumentTopOffset()
  const colSpan = Math.floor(24 / columns)
  const rowCount = Math.ceil(items.length / columns)

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 170,
    scrollMargin,
    overscan: 5
  })

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: rowVirtualizer.getTotalSize() }}>
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const startIndex = virtualRow.index * columns
        const rowItems = items.slice(startIndex, startIndex + columns)

        return (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`
            }}
          >
            <Row gutter={[16, 16]}>{rowItems.map((item) => renderItem(item, colSpan))}</Row>
          </div>
        )
      })}
    </div>
  )
}

export { VirtualizedGrid }
