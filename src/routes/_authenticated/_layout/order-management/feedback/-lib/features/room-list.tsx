import { Avatar, Badge, Empty, Input, Typography } from "antd"

import { useRoomSearch } from "../hooks/use-room-search"
import type { Room } from "../types"

import { classNames } from "@/utils/class-names"

interface RoomListProps {
  rooms: Room[]
  activeRoomId: number | null
  onSelectRoom: (roomId: number) => void
}

const RoomList = ({ rooms, activeRoomId, onSelectRoom }: RoomListProps) => {
  const { filteredRooms, roomKeywordInput, handleRoomKeywordChange } = useRoomSearch(rooms)
  return (
    <div className="border-divider flex h-full w-72 flex-col border-r">
      <div className="border-divider flex h-16 flex-initial items-center border-b px-4">
        <Input placeholder="搜尋聊天室" value={roomKeywordInput} onChange={(event) => handleRoomKeywordChange(event.target.value)} />
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-auto px-4 py-4">
        {filteredRooms.length === 0 ? (
          <div className="flex flex-1 items-center justify-center px-4 text-center">
            <Empty description="找不到符合的聊天室" image={Empty.PRESENTED_IMAGE_SIMPLE} className="mt-0" />
          </div>
        ) : (
          filteredRooms.map((room) => (
            <div
              key={room.id}
              className={classNames("cursor-pointer rounded-lg border border-transparent px-2 py-2", {
                "bg-blue-1 border-blue-2": room.id === activeRoomId
              })}
              onClick={() => onSelectRoom(room.id)}
            >
              <div className="flex items-center gap-3">
                <Badge count={room.unread} overflowCount={99}>
                  <Avatar shape="square">{room.name.slice(0, 1)}</Avatar>
                </Badge>
                <div className="min-w-0 flex-1">
                  <Typography.Text strong>{room.name}</Typography.Text>
                  <div>
                    <Typography.Text type="secondary" ellipsis>
                      {room.messages.at(-1)?.content ?? "暫無訊息"}
                    </Typography.Text>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export { RoomList }
