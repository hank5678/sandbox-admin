export type Message = {
  id: number
  from: "使用者" | "客服"
  content: string
  time: number
}

export type Room = {
  id: number
  name: string
  unread: number
  messages: Message[]
  online: boolean
}
