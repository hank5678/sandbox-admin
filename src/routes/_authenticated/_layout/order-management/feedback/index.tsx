import { createFileRoute } from "@tanstack/react-router"
import { Avatar, Card, Empty, Space } from "antd"

import { MessageComposer } from "./-lib/features/message-composer"
import { MessageList } from "./-lib/features/message-list"
import { RoomList } from "./-lib/features/room-list"
import { useMessageSend } from "./-lib/hooks/use-message-send"
import { useRoomList } from "./-lib/hooks/use-room-list"

import { classNames } from "@/utils/class-names"

export const Route = createFileRoute("/_authenticated/_layout/order-management/feedback/")({
  component: RouteComponent
})

function RouteComponent() {
  const { rooms, setRooms, activeRoomId, activeRoom, handleSelectRoom } = useRoomList()
  const activeMessages = activeRoom?.messages ?? []
  const { draft, setDraft, handleSend } = useMessageSend(activeRoom, setRooms)

  return (
    <div className="flex h-[calc(100vh-64px-48px-22px-16px)] flex-col overflow-hidden">
      {/* 聊天介面 */}
      <Card className="border-divider relative h-full flex-1 overflow-hidden" classNames={{ body: "flex p-0 h-full" }}>
        <RoomList rooms={rooms} activeRoomId={activeRoomId} onSelectRoom={handleSelectRoom} />

        {/* 右側聊天內容 */}
        <div className="flex h-full flex-1 flex-col overflow-hidden px-0 py-0">
          {/* 上方標題 */}
          {activeRoom !== undefined && (
            <div className="border-divider flex h-16 flex-initial items-center justify-between border-b py-4">
              <Space className="px-4">
                <Avatar size={38} shape="square">
                  {activeRoom.name.slice(0, 1)}
                </Avatar>
                <div>
                  <p className="m-0 font-bold">{activeRoom.name}</p>
                  <p
                    className={classNames("m-0 text-xs", {
                      "text-green-6": activeRoom.online,
                      "text-gray-6": !activeRoom.online
                    })}
                  >
                    {activeRoom.online ? "在線" : "離線"}
                  </p>
                </div>
              </Space>
            </div>
          )}

          {/* 中間訊息內容 */}
          {activeRoom ? (
            <>
              <MessageList messages={activeMessages} activeRoomId={activeRoomId} />
              <MessageComposer draft={draft} activeRoomId={activeRoomId} onDraftChange={setDraft} onSend={handleSend} />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <Empty description="選擇一個聊天室開始對話" style={{ marginTop: 0 }} />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
