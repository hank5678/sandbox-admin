import { useMutation, useQueryClient } from "@tanstack/react-query"

import { queryHelper } from "../utils/query-helper"

import { useToast } from "@/hooks/use-toast"
import { deleteProduct } from "@/services/product/delete"

const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  const { successMessage } = useToast()

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryHelper.invalidateAll(queryClient)
      successMessage("DELETE")
    }
  })
}

export default useDeleteProduct
