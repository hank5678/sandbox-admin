import { type LoginRequest, loginResponseSchema } from "./types"

import supabase from "@/lib/supabase"

export const authLogin = async (params: LoginRequest) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: params.identifier,
    password: params.password
  })

  if (error) throw error

  return loginResponseSchema.parse(data)
}
