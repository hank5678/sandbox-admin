import { supabase } from "@/libs/supabase"

export const authLogout = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut({ scope: "local" })

    if (error) {
      throw new Error(error.message || "登出時發生錯誤")
    }

    // 3. 成功後不需要回傳特定資料
    // console.log("已成功登出，本地 Token 已清除")
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("發生預期之外的錯誤")
  }
}
