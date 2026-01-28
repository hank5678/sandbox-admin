import { DeleteOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"

const DeleteButton = (props: ButtonProps) => (
  <Button icon={<DeleteOutlined />} size="small" danger {...props}>
    刪除
  </Button>
)

export default DeleteButton
