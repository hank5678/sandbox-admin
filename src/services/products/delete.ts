import supabase from "@/lib/supabase"

export interface DeleteProductParams {
  id: number
}

export const deleteProduct = async (params: DeleteProductParams) => {
  await supabase.from("products").delete().eq("id", params.id)
}
