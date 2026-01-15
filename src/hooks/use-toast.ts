import { App } from "antd"
import { useCallback } from "react"

import { getErrorDetails, getErrorMessage } from "@/utils/errors"
import { getSuccessMessage } from "@/utils/successes"

const useToast = () => {
  const { message, notification } = App.useApp()

  const successMessage = useCallback(
    (type: "CREATE" | "UPDATE" | "DELETE") => {
      const text = getSuccessMessage({ type })
      message.success(text)
    },
    [message]
  )

  const errorMessage = useCallback(
    (error: unknown) => {
      const userMessage = getErrorMessage(error)
      const debugDetails = getErrorDetails(error)
      message.error(userMessage)
      console.error(debugDetails)
      console.error(error)
    },
    [message]
  )

  return { message, notification, successMessage, errorMessage }
}

export { useToast }
