import { Form } from "antd"

import { useAuthLogin } from "../../hooks/use-auth-login"
import { type LoginFormValues, loginFormSchema } from "./schema"

export const useLoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>()
  const mutation = useAuthLogin()

  const handleFinish = (values: LoginFormValues) => {
    const parsed = loginFormSchema.parse(values)

    mutation.mutate({
      identifier: parsed.email,
      password: parsed.password
    })
  }

  const fillDemoAccount = (email: string, password: string) => {
    form.setFieldsValue({
      email,
      password
    })
  }

  return {
    form,
    isLoading: mutation.isPending,
    handleFinish,
    fillDemoAccount
  }
}
