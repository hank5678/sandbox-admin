import { createFileRoute, redirect } from "@tanstack/react-router"

import { useAuthStore } from "@/hooks/use-auth-store"

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const session = await useAuthStore.getState().checkAuth()

    if (!session) {
      throw redirect({
        to: "/"
      })
    }
  }
})
