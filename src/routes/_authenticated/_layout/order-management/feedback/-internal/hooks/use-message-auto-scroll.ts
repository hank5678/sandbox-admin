import { useEffect, useRef } from "react"

const useMessageAutoScroll = (activeRoomId: number | null, activeMessagesLength: number) => {
  const messageContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = messageContainerRef.current
    if (!container) return

    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight
    })
  }, [activeRoomId, activeMessagesLength])

  return { messageContainerRef }
}

export { useMessageAutoScroll }
