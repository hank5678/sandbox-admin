import { createFileRoute, redirect } from "@tanstack/react-router"

import Background from "./-lib/features/background"
import { LoginForm } from "./-lib/features/login-form"

import { supabase } from "@/libs/supabase"

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (session) {
      throw redirect({
        to: "/dashboard"
      })
    }
  }
})

function RouteComponent() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <Background />
      <LoginForm />
    </div>
  )
}
