import { StrictMode } from "react"
import ReactDOM from "react-dom/client"

import "./index.css"

import { GlobalErrorBoundary } from "@/components/boundarys/global-error-boundary"
import { ANTDProvider } from "@/components/providers/antd-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { RouterProvider } from "@/components/providers/router-provider"
import "@/libs/initialize"

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <GlobalErrorBoundary>
        <ANTDProvider>
          <QueryProvider>
            <RouterProvider />
          </QueryProvider>
        </ANTDProvider>
      </GlobalErrorBoundary>
    </StrictMode>
  )
}
