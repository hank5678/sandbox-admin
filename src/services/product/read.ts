import * as z from "zod"

import { productSchema } from "./types"

import { supabase } from "@/libs/supabase"
import { getPaginationRange } from "@/utils/get-pagination-range"

const mapIfExists = <K, V>(map: Map<K, V>, value: K | undefined): V | K | undefined => {
  return value && map.has(value) ? map.get(value) : value
}

const DEFAULT_SORT_FIELD = "createdAt"
const DEFAULT_ASCENDING = false

const TYPE_MAP = new Map([["all", undefined]])
const RARITY_MAP = new Map([["all", undefined]])
const TRADEABLE_MAP = new Map([
  ["all", undefined],
  ["yes", "yes"],
  ["no", "no"]
])

const FIELD_NAME_MAP = new Map([["createdTime", "createdAt"]])
const ORDER_MAP = new Map([
  ["ascend", true],
  ["descend", false]
])

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

const schema = z.object({
  data: z.array(productSchema),
  count: z.number()
})

export type ReadResponse = z.infer<typeof schema>

const transformParams = (params: ReadProductParams) => {
  const { filters, sorter, pagination } = params
  const [from, to] = getPaginationRange(pagination.page, pagination.size)

  return {
    range: [from, to] as const,
    filters: filters
      ? {
          ...filters,
          type: mapIfExists(TYPE_MAP, filters.type),
          rarity: mapIfExists(RARITY_MAP, filters.rarity),
          isTradeable: mapIfExists(TRADEABLE_MAP, filters.isTradeable)
        }
      : undefined,
    sorter: sorter
      ? {
          field: mapIfExists(FIELD_NAME_MAP, sorter.field) as string,
          order: mapIfExists(ORDER_MAP, sorter.order) as boolean
        }
      : undefined
  }
}

export const readProducts = async (params: ReadProductParams) => {
  const { range, filters, sorter } = transformParams(params)
  const [from, to] = range

  const query = supabase.from("products").select("*", { count: "exact" }).range(from, to)

  if (filters) {
    const { name, type, rarity, isTradeable, levelRequirement, price } = filters
    if (name) query.ilike("name", `%${name}%`)
    if (type) query.eq("type", type)
    if (rarity) query.eq("rarity", rarity)
    if (isTradeable) query.eq("isTradeable", isTradeable)
    if (levelRequirement) {
      query.gte("levelRequirement", levelRequirement[0])
      query.lte("levelRequirement", levelRequirement[1])
    }
    if (price) query.eq("price", price)
  }

  if (sorter) {
    query.order(sorter.field, { ascending: sorter.order })
  } else {
    query.order(DEFAULT_SORT_FIELD, { ascending: DEFAULT_ASCENDING })
  }

  const { data, error, count } = await query

  if (error) throw error

  return schema.parse({ data, count: count ?? 0 })
}
