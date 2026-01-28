import type { QueryClient } from "@tanstack/react-query"

export const QUERY_KEY = "products"

export const queryHelper = {
  invalidateAll: (queryClient: QueryClient) => {
    return queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
  },
  setQueriesData: <T>(queryClient: QueryClient, updater: (oldData: T | undefined) => T | undefined) => {
    queryClient.setQueriesData({ queryKey: [QUERY_KEY] }, updater)
  },
  getQueryData: <T>(queryClient: QueryClient) => {
    return queryClient.getQueryData<T>([QUERY_KEY])
  }
}
