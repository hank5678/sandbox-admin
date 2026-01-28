import { PlusOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"

const CreateButton = (props: ButtonProps) => (
  <Button type="primary" icon={<PlusOutlined />} {...props}>
    新增商品
  </Button>
)

export default CreateButton
