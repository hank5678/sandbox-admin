/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true
    }),
    react()
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/")
    }
  },
  test: {
    environment: "jsdom",
    globals: true
  },
  define: {
    __APP_BUILD_TIME__: new Date().getTime()
  }
})
