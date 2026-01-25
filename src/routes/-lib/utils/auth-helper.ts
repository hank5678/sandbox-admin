import { useAuthStore } from "@/hook"

/**
 * 檢查使用者是否已登入
 *
 * @returns 如果已有 token 則回傳 true
 */
export const isAuthenticated = (): boolean => {
  const token = useAuthStore.getState().token
  return token !== null
}
