import { supabase } from "@/libs/supabase"

/**
 * 更新參數（所有字段除 key 外都可選）
 */
export interface UpdateProductParams {
  id: number
  name?: string
  type?: string
  rarity?: string
  levelRequirement?: number
  isTradeable?: string
  price?: number
}

/**
 * 更新商品
 */
export const updateProduct = async (params: UpdateProductParams) => {
  const { id, ...rest } = params

  await supabase.from("products").update(rest).eq("id", id)
}
