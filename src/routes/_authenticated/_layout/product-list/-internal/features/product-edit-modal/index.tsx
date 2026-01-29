import { Form, Modal } from "antd"

import CreateButton from "../../components/create-button"
import UpdateButton from "../../components/update-button"
import type { Product } from "../../shared/types"
import { FormFields } from "./form-fields"
import { useForm } from "./use-form"

import { useToggle } from "@/hooks/use-toggle"

interface ProductEditModalProps {
  mode: "CREATE" | "UPDATE"
  product?: Product
}

const BUTTON_COMPONENT_MAP = {
  CREATE: CreateButton,
  UPDATE: UpdateButton
} as const

const ProductEditModal = ({ mode, product }: ProductEditModalProps) => {
  const [open, { setTrue: openModal, setFalse: closeModal }] = useToggle(false)

  const { form, loading, title, handleSubmit } = useForm({
    mode,
    id: product?.id,
    initialValues: product,
    onSuccess: closeModal
  })

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    closeModal()
    form.resetFields()
  }

  const ButtonComponent = BUTTON_COMPONENT_MAP[mode]

  return (
    <>
      <ButtonComponent onClick={openModal} />

      <Modal destroyOnHidden title={title} open={open} onOk={handleOk} okButtonProps={{ loading }} onCancel={handleCancel} okText="確定" cancelText="取消">
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={product}>
          <FormFields />
        </Form>
      </Modal>
    </>
  )
}

export { ProductEditModal }
