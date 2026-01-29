interface ImportMetaEnv {
  readonly VITE_SITE_NAME: string
  readonly VITE_SITE_DESCRIPTION: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string
  readonly VITE_DEMO_AUTH_EMAIL: string
  readonly VITE_DEMO_AUTH_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const __APP_BUILD_TIME__: number
