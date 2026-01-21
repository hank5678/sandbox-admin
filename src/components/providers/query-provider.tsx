import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type PropsWithChildren, useMemo } from "react"

import { useToast } from "@/hooks/use-toast"

const QueryProvider = ({ children }: PropsWithChildren) => {
  const { errorMessage } = useToast()

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false
          },
          mutations: {
            onError: (error) => {
              errorMessage(error)
            }
          }
        },
        queryCache: new QueryCache({
          onError: (error) => {
            errorMessage(error)
          }
        })
      }),
    [errorMessage]
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export { QueryProvider }
