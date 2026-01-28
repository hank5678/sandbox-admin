import { SendOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import { useEffect, useRef, useState } from "react"

interface MessageComposerProps {
  draft: string
  activeRoomId: number | null
  onDraftChange: (value: string) => void
  onSend: () => void
}

const MessageComposer = ({ draft, activeRoomId, onDraftChange, onSend }: MessageComposerProps) => {
  const [isComposing, setIsComposing] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isDisabled = isComposing || !draft.trim()

  useEffect(() => {
    if (activeRoomId !== null) {
      textareaRef.current?.focus()
    }
  }, [activeRoomId])

  return (
    <div className="flex flex-initial items-center gap-4 px-4 py-4">
      <Input.TextArea
        ref={textareaRef}
        maxLength={1000}
        autoSize={{ minRows: 1, maxRows: 4 }}
        rows={1}
        placeholder="請輸入訊息"
        className="flex-1 resize-none border-none p-0 focus:border-none focus:ring-0"
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onPressEnter={(event) => {
          if (event.nativeEvent.isComposing || isComposing) return
          if (!event.shiftKey && !isDisabled) {
            event.preventDefault()
            onSend()
          }
        }}
      />
      <div className="flex-initial">
        <Button
          type="primary"
          disabled={isDisabled}
          onClick={() => {
            if (isComposing) return
            onSend()
          }}
          icon={<SendOutlined />}
          aria-label="傳送訊息"
        >
          傳送
        </Button>
      </div>
    </div>
  )
}

export { MessageComposer }
