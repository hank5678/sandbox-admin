import { LockOutlined, MailOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, Modal, Typography } from "antd"

import { useLoginForm } from "./use-login-form"

import { DEMO_EMAIL, DEMO_PASSWORD, DESCRIPTION, SITE_NAME } from "@/constants"
import { useToggle } from "@/hooks/use-toggle"

const { Title, Text } = Typography

/**
 * 登入表單元件
 *
 * 包含信箱密碼輸入、登入按鈕、註冊提示與示範帳號彈窗
 */
export const LoginForm = () => {
  const { form, isLoading, handleFinish, fillDemoAccount } = useLoginForm()
  const [isModalOpen, { toggle, setFalse }] = useToggle(false)

  const handleFillDemo = () => {
    fillDemoAccount(DEMO_EMAIL, DEMO_PASSWORD)
    toggle()
  }

  return (
    <div className="relative flex w-full max-w-sm flex-col items-center">
      <Title level={1} className="mb-1 text-center">
        {SITE_NAME}
      </Title>
      <p className="text-gray-8 mb-4 text-center text-sm whitespace-pre">{DESCRIPTION}</p>

      <Card className="w-full" variant="borderless">
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
          <Button type="link" className="px-1" onClick={toggle}>
            註冊
          </Button>
        </div>
      </Card>

      <Modal title="註冊" open={isModalOpen} footer={null} width={400} onCancel={setFalse}>
        <div className="bg-gray-2 mt-4 rounded-md p-3 text-sm">
          <div>
            帳號：<b>{DEMO_EMAIL}</b>
          </div>
          <div>
            密碼：<b>{DEMO_PASSWORD}</b>
          </div>
        </div>

        <Button type="primary" block className="mt-4" onClick={handleFillDemo}>
          點擊自動輸入帳號
        </Button>
      </Modal>
    </div>
  )
}
