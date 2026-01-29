import { createFileRoute } from "@tanstack/react-router"
import { Col, Row } from "antd"

import { OperationalMetrics } from "./-internal/components/operational-metrics"
import { OrderVisitorComparison } from "./-internal/components/order-visitor-comparison"
import { OverallStatistics } from "./-internal/components/overall-statistics"
import { ProductTypeDistribution } from "./-internal/components/product-type-distribution"
import { SalesTrends } from "./-internal/components/sales-trends"
import { TopSellingProducts } from "./-internal/components/top-selling-products"

export const Route = createFileRoute("/_authenticated/_layout/dashboard/")({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <>
      {/* 整體統計 */}
      <OverallStatistics />
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={16}>
          {/* 銷售額趨勢 */}
          <SalesTrends />
        </Col>
        <Col xs={8}>
          {/* 商品類型分布 */}
          <ProductTypeDistribution />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mb-4" align="stretch">
        <Col xs={8}>
          {/* 營運指標 */}
          <OperationalMetrics />
        </Col>
        <Col xs={16}>
          {/* 熱銷商品排行 */}
          <TopSellingProducts />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          {/* 訂單量與訪客數對比 */}
          <OrderVisitorComparison />
        </Col>
      </Row>
    </>
  )
}
