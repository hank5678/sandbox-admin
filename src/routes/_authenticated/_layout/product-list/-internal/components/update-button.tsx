import { EditOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"

const UpdateButton = (props: ButtonProps) => (
  <Button icon={<EditOutlined />} size="small" {...props}>
    編輯
  </Button>
)

export default UpdateButton
