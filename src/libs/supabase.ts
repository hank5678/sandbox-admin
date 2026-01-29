import { createClient } from "@supabase/supabase-js"

import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/constants"
import { useAuthStore } from "@/hooks/use-auth-store"

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})

const initialize = () => {
  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.setState({ session, isInitialized: true })
  })
}

export { supabase, initialize }
