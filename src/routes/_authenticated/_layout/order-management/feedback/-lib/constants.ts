import type { Room } from "./types"

const BASE_TIME = new Date(2026, 0, 24, 14, 0).getTime()

export const INITIAL_ROOMS: Room[] = [
  {
    id: 1,
    name: "產品建議",
    online: true,
    unread: 5,
    messages: [
      { id: 1, from: "使用者", content: "我想要黑暗模式", time: BASE_TIME + 10 * 60000 },
      { id: 2, from: "客服", content: "瞭解，我們會評估需求。", time: BASE_TIME + 11 * 60000 },
      { id: 3, from: "使用者", content: "還有希望能有更多報表功能。", time: BASE_TIME + 12 * 60000 },
      { id: 4, from: "使用者", content: "因為報表能幫助我們更好地分析數據。", time: BASE_TIME + 12 * 60000 },
      { id: 5, from: "客服", content: "謝謝你的建議，我們會轉達給產品團隊。", time: BASE_TIME + 13 * 60000 },
      { id: 6, from: "使用者", content: "期待你們的更新！", time: BASE_TIME + 14 * 60000 },
      { id: 7, from: "客服", content: "我們會持續努力，謝謝你的支援！", time: BASE_TIME + 15 * 60000 },
      { id: 8, from: "使用者", content: "另一方面，能不能增加匯出 CSV 的功能？", time: BASE_TIME + 16 * 60000 },
      { id: 9, from: "客服", content: "這個建議也很棒，我們會一並考慮。", time: BASE_TIME + 17 * 60000 },
      { id: 10, from: "使用者", content: "謝謝你們的回應！", time: BASE_TIME + 18 * 60000 },
      { id: 11, from: "客服", content: "不客氣，隨時歡迎提供更多意見！", time: BASE_TIME + 19 * 60000 },
      { id: 12, from: "使用者", content: "最後，能不能優化一下手機版的介面？", time: BASE_TIME + 20 * 60000 },
      { id: 13, from: "使用者", content: "在小螢幕上操作有點不便。", time: BASE_TIME + 20 * 60000 }
    ]
  },
  {
    id: 2,
    name: "付款問題",
    online: false,
    unread: 0,
    messages: [
      { id: 1, from: "使用者", content: "刷卡失敗怎麼辦？", time: BASE_TIME + (1 * 60 + 5) * 60000 },
      { id: 2, from: "客服", content: "可否提供錯誤訊息截圖？", time: BASE_TIME + (1 * 60 + 6) * 60000 }
    ]
  },
  {
    id: 3,
    name: "Bug 回報",
    online: false,
    unread: 1,
    messages: [
      { id: 1, from: "使用者", content: "清單排序事件會跳回第一頁。", time: BASE_TIME + 14 * 60000 },
      { id: 2, from: "客服", content: "瞭解，我們會請工程師確認。", time: BASE_TIME + 15 * 60000 }
    ]
  },
  {
    id: 4,
    name: "合作提案",
    online: true,
    unread: 3,
    messages: [
      { id: 1, from: "使用者", content: "可以安排 demo 嗎？", time: BASE_TIME + 14 * 60000 },
      { id: 2, from: "客服", content: "沒問題，請問方便的時間？", time: BASE_TIME + 15 * 60000 },
      { id: 3, from: "使用者", content: "下週三下午可以嗎？", time: BASE_TIME + 16 * 60000 },
      { id: 4, from: "客服", content: "好的，我們會寄送邀請郵件。", time: BASE_TIME + 16 * 60000 },
      { id: 5, from: "客服", content: "謝謝您。", time: BASE_TIME + 16 * 60000 }
    ]
  },
  {
    id: 5,
    name: "帳號中心",
    online: true,
    unread: 0,
    messages: [
      { id: 1, from: "使用者", content: "忘記密碼怎麼辦？", time: BASE_TIME + 9 * 60000 },
      { id: 2, from: "客服", content: "請使用忘記密碼功能重設。", time: BASE_TIME + 10 * 60000 }
    ]
  },
  {
    id: 6,
    name: "其他問題",
    online: false,
    unread: 0,
    messages: []
  }
]

export const AUTO_REPLIES = [
  "收到，感謝你的回覆，我再補充看看。",
  "瞭解，我先試試看，稍後回覆你。",
  "可以幫我提供更多細節嗎？",
  "我會再確認一下，謝謝。",
  "好的，謝謝你提供資訊。",
  "感謝你的協助，辛苦了！",
  "謝謝你的回覆，我會再跟進。",
  "了解，期待你的更新。",
  "謝謝你提供的建議！",
  "感謝你的耐心說明。"
]
