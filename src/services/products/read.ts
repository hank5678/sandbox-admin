import * as z from "zod"

import { productSchema } from "./types"

import { supabase } from "@/libs/supabase"

export interface ReadProductParams {
  pagination: {
    page: number
    size: number
  }
  filters?: {
    name?: string
    type?: string
    rarity?: string
    levelRequirement?: [number, number]
    isTradeable?: string
    price?: number | null
  }
  sorter?: {
    field: string
    order: "ascend" | "descend"
  }
}

export const readResponseSchema = z.object({
  data: z.array(productSchema),
  count: z.number()
})

export type ReadResponse = z.infer<typeof readResponseSchema>

const transformParams = (params: ReadProductParams): ReadProductParams => {
  const transformed = { ...params }

  if (transformed.filters) {
    const filters = { ...transformed.filters }

    if (filters.type === "all") {
      filters.type = undefined
    }
    if (filters.rarity === "all") {
      filters.rarity = undefined
    }

    if (filters.isTradeable && filters.isTradeable !== "all") {
      filters.isTradeable = filters.isTradeable === "yes" ? "yes" : "no"
    } else if (filters.isTradeable === "all") {
      filters.isTradeable = undefined
    }

    transformed.filters = filters
  }

  // 轉換排序欄位名稱
  if (transformed.sorter) {
    const sorter = { ...transformed.sorter }
    sorter.field = sorter.field === "createdTime" ? "createdAt" : sorter.field
    transformed.sorter = sorter
  }

  return transformed
}

export const readProducts = async (params?: ReadProductParams): Promise<ReadResponse> => {
  const transformedParams = params ? transformParams(params) : undefined

  const { page, size } = transformedParams?.pagination ?? { page: 1, size: 10 }

  const from = (page - 1) * size
  const to = from + size - 1

  const query = supabase.from("products").select("*", { count: "exact" }).range(from, to)

  if (transformedParams?.filters) {
    const { filters } = transformedParams
    if (filters.name) query.ilike("name", `%${filters.name}%`)
    if (filters.type) query.eq("type", filters.type)
    if (filters.rarity) query.eq("rarity", filters.rarity)
    if (filters.isTradeable) query.eq("isTradeable", filters.isTradeable)
    if (filters.levelRequirement) {
      query.gte("levelRequirement", filters.levelRequirement[0])
      query.lte("levelRequirement", filters.levelRequirement[1])
    }
    if (filters.price) query.eq("price", filters.price)
  }

  if (params?.sorter) {
    const { sorter } = params
    const isAsc = sorter.order === "ascend"
    query.order(sorter.field, { ascending: isAsc })
  } else {
    query.order("createdAt", { ascending: false })
  }

  const { data, error, count } = await query

  if (error) throw error

  return readResponseSchema.parse({ data, count })
}
