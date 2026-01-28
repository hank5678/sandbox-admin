import { useMutation, useQueryClient } from "@tanstack/react-query"

import { queryHelper } from "../utils/query-helper"

import { useToast } from "@/hooks/use-toast"
import type { ReadResponse } from "@/services/products/read"
import { type UpdateProductParams, updateProduct } from "@/services/products/update"

const useUpdateProduct = () => {
  const { successMessage } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProduct,

    // 樂觀更新：立即更新 UI
    onMutate: async (params: UpdateProductParams) => {
      // 快照當前資料
      const snapshot = queryHelper.getQueryData<ReadResponse>(queryClient)

      queryHelper.setQueriesData<ReadResponse>(queryClient, (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          data: oldData.data.map((product) => {
            if (product.id !== params.id) return product
            return { ...product, ...params }
          })
        }
      })

      return { snapshot }
    },
    onSuccess: () => {
      successMessage("UPDATE")
    },
    onError: (_error, _params, context) => {
      if (context?.snapshot) {
        queryHelper.setQueriesData(queryClient, () => context.snapshot)
      }
    }
  })
}

export default useUpdateProduct
