import { useMutation } from "@tanstack/react-query"

import { useToast } from "@/hooks/use-toast"
import { router } from "@/lib/router"
import { authLogin } from "@/services/auth/login"

const WELCOME_MESSAGES = [
  "今天又是充滿動力的一天，我們開始吧！",
  "準備好要大展身手了嗎？",
  "總算等到你了，系統已經準備就緒。",
  "歡迎回來，這台機器的指揮官！",
  "帳號密碼正確！正在為您開啟通往後台的神秘大門...",
  "今天也要保持愉快的心情喔！"
]

export const useAuthLogin = () => {
  const { notification } = useToast()
  return useMutation({
    mutationFn: authLogin,
    onSuccess: () => {
      router.navigate({ to: "/dashboard", replace: true })
      const message = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)]
      notification.success({ title: "登入成功", description: message })
    }
  })
}
