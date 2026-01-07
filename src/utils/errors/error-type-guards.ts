import { isAuthError } from "@supabase/supabase-js"
import { ZodError } from "zod"

export const isZodError = (error: unknown): error is ZodError => {
  return error instanceof ZodError
}

export const isPostgresError = (error: unknown): error is { code?: string; message: string; details?: string } => {
  return (
    typeof error === "object" && error !== null && ("code" in error || "message" in error) && typeof (error as Record<string, unknown>).message === "string"
  )
}

export { isAuthError }

export const isStandardError = (error: unknown): error is Error => {
  return error instanceof Error
}
