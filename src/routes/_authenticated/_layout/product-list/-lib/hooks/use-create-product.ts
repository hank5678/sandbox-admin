import { useMutation, useQueryClient } from "@tanstack/react-query"

import { queryHelper } from "../utils/query-helper"

import { useToast } from "@/hooks/use-toast"
import { createProduct } from "@/services/products/create"

const useCreateProduct = () => {
  const queryClient = useQueryClient()
  const { successMessage } = useToast()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryHelper.invalidateAll(queryClient)
      successMessage("CREATE")
    }
  })
}

export default useCreateProduct
