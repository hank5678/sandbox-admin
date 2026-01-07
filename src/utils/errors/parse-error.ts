import { isAuthError, isPostgresError, isStandardError, isZodError } from "./error-type-guards"
import { AUTH_ERROR_MESSAGES, POSTGRES_ERROR_MESSAGES, STANDARD_ERROR_MESSAGES, ZOD_ERROR_MESSAGE } from "./messages"

interface ErrorInfo {
  type: "zod" | "postgres" | "auth" | "standard" | "unknown"
  message: string
  originalError: unknown
  details?: string
  code?: string
}

export const parseError = (error: unknown): ErrorInfo => {
  if (isZodError(error)) {
    const firstIssue = error.issues[0]
    return {
      type: "zod",
      message: ZOD_ERROR_MESSAGE,
      details: `${firstIssue.path.join(".")} - ${firstIssue.message}`,
      originalError: error
    }
  }

  if (isAuthError(error)) {
    const code = error.code ?? "unknown"
    const message = AUTH_ERROR_MESSAGES[code] ?? error.message
    return {
      type: "auth",
      message,
      code,
      originalError: error
    }
  }

  if (isPostgresError(error)) {
    const code = error.code ?? "unknown"
    const message = POSTGRES_ERROR_MESSAGES[code] ?? error.message

    return {
      type: "postgres",
      message,
      code,
      details: error.details,
      originalError: error
    }
  }

  if (isStandardError(error)) {
    const message = STANDARD_ERROR_MESSAGES[error.name] || error.message || "發生未知錯誤，請稍後重試"

    return {
      type: "standard",
      message,
      details: error.stack,
      originalError: error
    }
  }

  // 其他未知錯誤
  const unknownMessage =
    typeof error === "string"
      ? error
      : typeof error === "object" && error !== null && "message" in error
        ? (error as Record<string, unknown>).message
        : "發生未知錯誤"

  return {
    type: "unknown",
    message: String(unknownMessage) || "發生未知錯誤，請稍後重試",
    originalError: error
  }
}
