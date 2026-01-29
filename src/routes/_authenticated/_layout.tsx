import { Outlet, createFileRoute } from "@tanstack/react-router"
import { Layout } from "antd"

import { Breadcrumb } from "./-internal/features/breadcrumb"
import { Header } from "./-internal/features/header"
import { Navigation } from "./-internal/features/navigation"

import { OutletErrorBoundary } from "@/components/boundarys/outlet-error-boundary"

const { Content } = Layout

export const Route = createFileRoute("/_authenticated/_layout")({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Navigation />
      <Content className="pt-16 pl-50">
        <div className="relative p-6">
          <Breadcrumb />
          <OutletErrorBoundary>
            <div className="relative">
              <Outlet />
            </div>
          </OutletErrorBoundary>
        </div>
      </Content>
    </Layout>
  )
}
