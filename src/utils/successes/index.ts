interface HandleSuccessParams {
  type?: "CREATE" | "UPDATE" | "DELETE"
}

const getSuccessMessage = ({ type }: HandleSuccessParams) => {
  const UPDATE_MESSAGES = [
    "更新成功！這次的改動簡直是神來之筆，系統感覺更有質感了。",
    "更新成功！新的設定已即刻生效，系統這就去執行您的旨意。",
    "更新成功！變更已送達資料庫最深處，誰也別想動它。",
    "更新成功！指令已順利傳達，您的效率簡直無懈可擊。",
    "更新成功！改動已全數錄入，您可以繼續下一個大計畫了。"
  ]

  const CREATE_MESSAGES = [
    "新增成功！您的資料已安全存入系統，感謝您的貢獻。",
    "新增成功！新的記錄已被妥善保存，系統運作更加完善了。",
    "新增成功！資料已被順利添加，系統現在更加豐富多彩了。",
    "新增成功！新的資訊已被妥善記錄，感謝您讓系統更完整。",
    "新增成功！您的數據已成功注入，系統運行更加順暢了。"
  ]

  const DELETE_MESSAGES = [
    "刪除成功！不需要的資料已被清除，系統現在更乾淨了。",
    "刪除成功！冗餘的資訊已被移除，系統運作更加高效了。",
    "刪除成功！不必要的記錄已被抹去，系統現在更有條理了。",
    "刪除成功！多餘的數據已被清理，感謝您讓系統更精簡。",
    "刪除成功！無用的資訊已被剷除，系統運行更加流暢了。"
  ]

  switch (type) {
    case "CREATE":
      return CREATE_MESSAGES[Math.floor(Math.random() * CREATE_MESSAGES.length)]
    case "UPDATE":
      return UPDATE_MESSAGES[Math.floor(Math.random() * UPDATE_MESSAGES.length)]
    case "DELETE":
      return DELETE_MESSAGES[Math.floor(Math.random() * DELETE_MESSAGES.length)]
    default:
      return "操作成功！"
  }
}

export { getSuccessMessage }
