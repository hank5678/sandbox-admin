import { debounce } from "lodash-es"
import { useCallback, useEffect, useMemo, useState } from "react"

import type { Room } from "../types"

const normalizeText = (value: string) => value.trim().toLowerCase()

const useRoomSearch = (rooms: Room[]) => {
  const [roomKeyword, setRoomKeyword] = useState("")
  const [roomKeywordInput, setRoomKeywordInput] = useState("")

  const filteredRooms = useMemo(() => {
    const keyword = normalizeText(roomKeyword)
    return rooms.filter((room) => {
      if (!keyword) return true
      if (room.name.toLowerCase().includes(keyword)) return true
      return room.messages.some((message) => message.content.toLowerCase().includes(keyword))
    })
  }, [roomKeyword, rooms])

  const debouncedSetRoomKeyword = useMemo(
    () =>
      debounce((value: string) => {
        setRoomKeyword(value)
      }, 300),
    []
  )

  useEffect(() => {
    return () => {
      debouncedSetRoomKeyword.cancel()
    }
  }, [debouncedSetRoomKeyword])

  const handleRoomKeywordChange = useCallback(
    (value: string) => {
      setRoomKeywordInput(value)
      debouncedSetRoomKeyword(value)
    },
    [debouncedSetRoomKeyword]
  )

  return {
    roomKeyword,
    roomKeywordInput,
    filteredRooms,
    handleRoomKeywordChange
  }
}

export { useRoomSearch }
