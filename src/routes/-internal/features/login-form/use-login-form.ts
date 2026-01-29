import { Form } from "antd"
import { useCallback } from "react"

import { useAuthLogin } from "../../hooks/use-auth-login"
import { type LoginFormValues, loginFormSchema } from "./schema"

import { DEMO_EMAIL, DEMO_PASSWORD } from "@/constants"
import { useToast } from "@/hooks/use-toast"

export const useLoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>()
  const mutation = useAuthLogin()
  const { message } = useToast()

  const handleFinish = useCallback(
    (values: LoginFormValues) => {
      const parsed = loginFormSchema.parse(values)

      mutation.mutate({
        identifier: parsed.email,
        password: parsed.password
      })
    },
    [mutation]
  )

  const setDemoFieldValues = useCallback(() => {
    form.setFieldsValue({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD
    })
    message.success("已填入測試帳號，請點擊登入按鈕")
  }, [form, message])

  return {
    form,
    isLoading: mutation.isPending,
    handleFinish,
    setDemoFieldValues
  }
}
