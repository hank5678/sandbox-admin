import { z } from "zod"

/**
 * 登入 API 回應 Schema
 */
export const loginResponseSchema = z
  .object({
    session: z.object({
      access_token: z.string(),
      token_type: z.string(),
      expires_in: z.number(),
      refresh_token: z.string(),
      user: z.object({
        id: z.string(),
        email: z.string()
      })
    })
  })
  .transform((data) => ({
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    tokenType: data.session.token_type,
    expiresIn: data.session.expires_in,
    userId: data.session.user.id,
    userEmail: data.session.user.email
  }))

/**
 * 登入 API 錯誤回應 Schema
 */
export const loginErrorSchema = z.object({
  error: z.object({
    status: z.literal(400),
    name: z.literal("ValidationError"),
    message: z.literal("Invalid identifier or password")
  })
})

/**
 * 登入請求參數
 */
export interface LoginRequest {
  identifier: string
  password: string
}

/**
 * 登入回應類型
 */
export type LoginResponse = z.infer<typeof loginResponseSchema>
