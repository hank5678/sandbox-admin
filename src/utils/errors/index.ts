import { parseError } from "./parse-error"

/**
 * 取得使用者友善的錯誤訊息
 * 適合用於 UI 顯示
 */
export const getErrorMessage = (error: unknown): string => parseError(error).message

/**
 * 取得錯誤的詳細資訊
 * 適合用於日誌或開發者除錯
 */
export const getErrorDetails = (error: unknown): string => {
  const errorInfo = parseError(error)
  const details = [
    `[${errorInfo.type.toUpperCase()}]`,
    errorInfo.message,
    ...(errorInfo.code ? [`Code: ${errorInfo.code}`] : []),
    ...(errorInfo.details ? [`Details: ${errorInfo.details}`] : [])
  ]

  return details.join(" | ")
}
