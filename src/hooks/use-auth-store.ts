import { type Session } from "@supabase/supabase-js"
import { create } from "zustand"

import supabase from "@/lib/supabase"

interface AuthState {
  session: Session | null
  isInitialized: boolean
  checkAuth: () => Promise<Session | null>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  isInitialized: false,

  checkAuth: async () => {
    if (get().isInitialized) {
      return get().session
    } else {
      const {
        data: { session }
      } = await supabase.auth.getSession()
      set({ session, isInitialized: true })
      return session
    }
  }
}))
