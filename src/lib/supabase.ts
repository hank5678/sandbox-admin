import { createClient } from "@supabase/supabase-js"

import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/constant"
import { useAuthStore } from "@/hooks/use-auth-store"

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.setState({ session, isInitialized: true })
})

export default supabase
