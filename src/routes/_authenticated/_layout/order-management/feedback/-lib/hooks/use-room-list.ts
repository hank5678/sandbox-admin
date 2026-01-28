import { useCallback, useMemo, useState } from "react"

import { INITIAL_ROOMS } from "../constants"

const useRoomList = () => {
  const [rooms, setRooms] = useState(() => INITIAL_ROOMS)
  const [activeRoomId, setActiveRoomId] = useState<number | null>(() => null)

  const activeRoom = useMemo(() => rooms.find((room) => room.id === activeRoomId), [activeRoomId, rooms])

  const handleSelectRoom = useCallback((roomId: number) => {
    setActiveRoomId(roomId)
    setRooms((prev) => prev.map((room) => (room.id === roomId ? { ...room, unread: 0 } : room)))
  }, [])

  return {
    rooms,
    setRooms,
    activeRoomId,
    setActiveRoomId,
    activeRoom,
    handleSelectRoom
  }
}

export { useRoomList }
