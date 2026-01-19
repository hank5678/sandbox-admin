import { Button, Result } from "antd"
import { type ReactNode } from "react"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : String(error)
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Result
        status="500"
        title="發生錯誤"
        subTitle={errorMessage || "應用程式遇到意外錯誤，請重新整理頁面"}
        extra={
          <Button type="primary" onClick={resetErrorBoundary}>
            重新整理
          </Button>
        }
      />
    </div>
  )
}

interface GlobalErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

function GlobalErrorBoundary({ children, fallback }: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={fallback ? () => fallback : ErrorFallback}
      onError={(error, errorInfo) => {
        console.error("Error Boundary caught:", error)
        console.error("Error Info:", errorInfo)
      }}
      onReset={() => {
        console.log("Error boundary reset")
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

export { GlobalErrorBoundary }
