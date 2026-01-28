import { Popconfirm } from "antd"

import DeleteButton from "../../components/delete-button"
import useDeleteProduct from "../../hooks/use-delete-product"

interface ProductDeleteButtonProps {
  id: number
}

const ProductDeleteButton = ({ id }: ProductDeleteButtonProps) => {
  const mutation = useDeleteProduct()

  return (
    <Popconfirm title="刪除" description="確定刪除嗎？" onConfirm={() => mutation.mutateAsync({ id })}>
      <DeleteButton />
    </Popconfirm>
  )
}

export { ProductDeleteButton }
