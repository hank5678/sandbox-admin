import { LockOutlined, MailOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, Typography } from "antd"

import { useLoginForm } from "./use-login-form"

import { APP_BUILD_TIME, DESCRIPTION, SITE_NAME } from "@/constants"
import { formatTime } from "@/utils/format-time"

const { Title, Text } = Typography

/** 登入表單元件 */
export const LoginForm = () => {
  const { form, isLoading, handleFinish, setDemoFieldValues } = useLoginForm()
  const systemUpdateMessage = `系統更新於 ${formatTime(APP_BUILD_TIME)}`

  return (
    <div className="relative flex w-full max-w-sm flex-col items-center">
      <Title level={1} className="mb-1 text-center">
        {SITE_NAME}
      </Title>
      <p className="text-gray-8 mb-4 text-center text-sm whitespace-pre">{DESCRIPTION}</p>

      <Card className="mb-2 w-full" variant="borderless">
        <Form form={form} layout="vertical" autoComplete="off" requiredMark={false} onFinish={handleFinish}>
          <Form.Item label="信箱" name="email" rules={[{ required: true }, { type: "email" }]}>
            <Input prefix={<MailOutlined />} placeholder="you@example.com" />
          </Form.Item>

          <Form.Item label="密碼" name="password" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
          </Form.Item>

          <Button loading={isLoading} type="primary" htmlType="submit" block className="mt-2">
            登入
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <Text type="secondary">還沒有帳號？</Text>
          <Button type="link" className="px-1" onClick={setDemoFieldValues}>
            點擊自動填入測試帳號
          </Button>
        </div>
      </Card>
      <p className="text-gray-8 fixed right-0 bottom-0 mr-4 mb-4 text-xs">{systemUpdateMessage}</p>
    </div>
  )
}
