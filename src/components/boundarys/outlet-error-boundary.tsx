import { Alert, Button, Space } from "antd"
import { type ReactNode } from "react"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"

function OutletErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : String(error)
  return (
    <Alert
      title="發生錯誤"
      description={errorMessage || "發生未預期的錯誤"}
      type="error"
      showIcon
      action={
        <Space>
          <Button size="small" danger onClick={resetErrorBoundary}>
            重試
          </Button>
        </Space>
      }
      className="mb-4"
    />
  )
}

interface OutletErrorBoundaryProps {
  resetKeys?: Array<string | number>
  children: ReactNode
  fallback?: ReactNode
}

function OutletErrorBoundary({ children, fallback, resetKeys = [] }: OutletErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={fallback ? () => fallback : OutletErrorFallback}
      onError={(error, errorInfo) => {
        console.error(error)
        console.error(errorInfo)
      }}
      resetKeys={resetKeys}
    >
      {children}
    </ErrorBoundary>
  )
}

export { OutletErrorBoundary }
