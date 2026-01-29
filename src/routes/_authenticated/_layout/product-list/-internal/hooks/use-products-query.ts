import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { QUERY_KEY } from "../utils/query-helper"

import { type ReadProductParams, readProducts } from "@/services/product/read"

const useProductsQuery = (params?: ReadProductParams) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => readProducts(params),
    placeholderData: keepPreviousData
  })
}

export { useProductsQuery }
