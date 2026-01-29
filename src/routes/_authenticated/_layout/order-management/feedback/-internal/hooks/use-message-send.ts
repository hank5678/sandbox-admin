import { useCallback, useEffect, useRef, useState } from "react"

import { AUTO_REPLIES } from "../constants"
import type { Message, Room } from "../types"

export const getCurrentTime = () => Date.now()

const generateMessageId = (): number => {
  return Date.now() * 1000 + Math.floor(Math.random() * 1000)
}

const appendMessage = (rooms: Room[], roomId: number, message: Message) =>
  rooms.map((room) => (room.id === roomId ? { ...room, messages: [...room.messages, message] } : room))

const useMessageSend = (activeRoom: Room | undefined, setRooms: (fn: (prev: Room[]) => Room[]) => void) => {
  const [draft, setDraft] = useState("")
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSend = useCallback(() => {
    const content = draft.trim()
    if (!content || !activeRoom) return

    const replyContent = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)]

    setRooms((prev) => {
      const room = prev.find((item) => item.id === activeRoom.id)
      if (!room) return prev

      const newMessage: Message = {
        id: generateMessageId(),
        from: "客服",
        content,
        time: getCurrentTime()
      }

      return appendMessage(prev, activeRoom.id, newMessage)
    })

    // 清理先前的 timeout，避免跨房間殘留
    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current)
    }

    replyTimeoutRef.current = setTimeout(() => {
      setRooms((prev) => {
        const room = prev.find((item) => item.id === activeRoom.id)
        if (!room) return prev

        const replyMessage: Message = {
          id: generateMessageId(),
          from: "使用者",
          content: replyContent,
          time: getCurrentTime()
        }

        return appendMessage(prev, activeRoom.id, replyMessage)
      })
      replyTimeoutRef.current = null
    }, 600)

    setDraft("")
  }, [activeRoom, draft, setRooms])

  // 清理計時器：房間切換或元件卸載時
  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        clearTimeout(replyTimeoutRef.current)
        replyTimeoutRef.current = null
      }
    }
  }, [activeRoom?.id])

  return {
    draft,
    setDraft,
    handleSend
  }
}

export { useMessageSend }
