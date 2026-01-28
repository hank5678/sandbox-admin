import { createFileRoute } from "@tanstack/react-router"
import { Button, Card, Col, Form, Input, Row } from "antd"

export const Route = createFileRoute("/_authenticated/_layout/setting/")({
  component: RouteComponent
})

function RouteComponent() {
  const [form] = Form.useForm()

  return (
    <div>
      <Card>
        <Form form={form} layout="vertical">
          <Form.Item label="店鋪名稱" name="shopName" initialValue="阿貴的武器店">
            <Input />
          </Form.Item>
          <Form.Item label="店鋪描述" name="description" initialValue="品質最優的武器交易平台">
            <Input.TextArea rows={4} className="resize-none" />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="聯絡電話" name="phone" initialValue="(02) 1234-5678">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="店鋪地址" name="address" initialValue="台北市中山區">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form>
      </Card>
    </div>
  )
}
