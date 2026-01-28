import { Form } from "antd"

import useCreateProduct from "../../hooks/use-create-product"
import useUpdateProduct from "../../hooks/use-update-product"
import { type FormValues, schema } from "./schema"

import { useToast } from "@/hooks/use-toast"

interface UseUpsertFormProps {
  mode: "CREATE" | "UPDATE"
  id?: number
  initialValues?: Partial<FormValues>
  onSuccess?: () => void
}

const useForm = ({ mode, id, onSuccess }: UseUpsertFormProps) => {
  const { message } = useToast()
  const [form] = Form.useForm<FormValues>()
  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct()

  const loading = createMutation.isPending || updateMutation.isPending
  const title = mode === "CREATE" ? "新增商品" : "編輯商品"

  const handleSubmit = (values: unknown) => {
    const parsed = schema.safeParse(values)
    if (!parsed.success) {
      message.error("表單驗證失敗")
      console.error(parsed.error)
      return
    }
    const mutateOptions = {
      onSuccess: () => {
        form.resetFields()
        onSuccess?.()
      }
    }
    if (mode === "CREATE") {
      createMutation.mutate(parsed.data, mutateOptions)
    }
    if (mode === "UPDATE" && id) {
      updateMutation.mutate({ id, ...parsed.data }, mutateOptions)
    }
  }

  return {
    form,
    loading,
    title,
    handleSubmit
  }
}

export { useForm }
