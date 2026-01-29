import { Empty, Space, Typography } from "antd"

import { useMessageAutoScroll } from "../hooks/use-message-auto-scroll"
import type { Message } from "../types"

import { classNames } from "@/utils/class-names"
import { formatTime } from "@/utils/format-time"

interface MessageListProps {
  messages: Message[]
  activeRoomId: number | null
}

const MessageList = ({ messages, activeRoomId }: MessageListProps) => {
  const { messageContainerRef } = useMessageAutoScroll(activeRoomId, messages.length)

  const renderMessageItem = (message: Message, index: number) => {
    const currentTime = formatTime(message.time, { type: "HOUR_MINUTE" })

    const nextMessage = messages[index + 1]
    const nextTime = nextMessage ? formatTime(nextMessage.time, { type: "HOUR_MINUTE" }) : null

    // 判斷是否需要顯示時間
    // 條件：時間不同 OR 發送者不同 OR 沒有下一個訊息（最後一個訊息）
    const shouldShowTime = currentTime !== nextTime || !nextMessage || message.from !== nextMessage.from

    return (
      <div key={message.id} className={`max-w-[70%] ${message.from === "客服" ? "self-end" : "self-start"}`}>
        <div
          className={classNames("rounded-md border p-3", {
            "bg-blue-1 border-blue-2": message.from === "客服",
            "bg-gray-3 border-gray-4": message.from === "使用者"
          })}
        >
          <Space orientation="vertical" size={4}>
            <Typography.Text className="whitespace-pre-wrap">{message.content}</Typography.Text>
          </Space>
        </div>

        {shouldShowTime && (
          <Typography.Text
            type="secondary"
            className={classNames("mt-1 block text-xs", {
              "mr-2 text-right": message.from === "客服",
              "ml-2 text-left": message.from === "使用者"
            })}
          >
            {currentTime}
          </Typography.Text>
        )}
      </div>
    )
  }

  const renderMessageContent = () => {
    if (messages.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <Empty description="暫無訊息" image={Empty.PRESENTED_IMAGE_SIMPLE} className="mt-0" />
        </div>
      )
    } else {
      return messages.map((msg, index) => renderMessageItem(msg, index))
    }
  }

  return (
    <div className="border-divider flex h-full flex-1 flex-col gap-3 overflow-hidden border-b pr-2">
      <div ref={messageContainerRef} className="relative flex h-full flex-col gap-3 overflow-y-auto px-4 py-4">
        {renderMessageContent()}
      </div>
    </div>
  )
}

export { MessageList }
