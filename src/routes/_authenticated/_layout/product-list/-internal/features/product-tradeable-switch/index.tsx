import { Switch } from "antd"

import useUpdateProduct from "../../hooks/use-update-product"
import type { Product } from "../../shared/types"

interface ProductTradeableSwitchProps {
  product: Product
}

const ProductTradeableSwitch = ({ product }: ProductTradeableSwitchProps) => {
  const mutation = useUpdateProduct()
  const checked = product.isTradeable === "yes"

  const handleChange = (value: boolean) => {
    mutation.mutate({
      id: product.id,
      isTradeable: value === true ? "yes" : "no"
    })
  }

  return <Switch checked={checked} loading={mutation.isPending} checkedChildren="是" unCheckedChildren="否" onChange={handleChange} />
}

export { ProductTradeableSwitch }
