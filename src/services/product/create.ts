import { supabase } from "@/libs/supabase"

export interface CreateProductParams {
  name: string
  type: string
  rarity: string
  levelRequirement: number
  isTradeable: string
  price: number
}

const transformPayload = (params: CreateProductParams) => ({
  ...params,
  isTradeable: params.isTradeable === "yes"
})

export const createProduct = async (params: CreateProductParams) => {
  const payload = transformPayload(params)
  await supabase.from("products").insert([payload])
}
