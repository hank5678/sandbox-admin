import { createFileRoute, redirect } from "@tanstack/react-router"

import supabase from "@/lib/supabase"

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession()

    if (error || !session) {
      throw redirect({
        to: "/"
      })
    }
  }
})
