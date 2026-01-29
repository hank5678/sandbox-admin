import { useMutation } from "@tanstack/react-query"

import { useToast } from "@/hooks/use-toast"
import { router } from "@/libs/router"
import { authLogout } from "@/services/auth/logout"

const GOODBYE_MESSAGES = [
  "期待您的下次光臨，祝您有美好的一天！",
  "感謝您的使用，再見！",
  "希望很快能再次見到您！",
  "祝您一切順利，期待再次為您服務！",
  "您已成功登出，期待您的下次到來！"
]

export const useAuthLogout = () => {
  const { notification } = useToast()
  return useMutation({
    mutationFn: authLogout,
    onSuccess: () => {
      router.navigate({ to: "/", replace: true })
      const message = GOODBYE_MESSAGES[Math.floor(Math.random() * GOODBYE_MESSAGES.length)]
      notification.success({ title: "登出成功", description: message })
    }
  })
}
