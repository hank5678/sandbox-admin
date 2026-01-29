import { createFileRoute } from "@tanstack/react-router"
import { Card } from "antd"
import { useState } from "react"

import { ProductEditModal } from "./-internal/features/product-edit-modal"
import { ProductsFilter } from "./-internal/features/products-filter"
import { FILTER_INITIAL_VALUES } from "./-internal/features/products-filter/constants"
import type { FormValues } from "./-internal/features/products-filter/schema"
import { ProductsTable } from "./-internal/features/products-table"
import { useProductsQuery } from "./-internal/hooks/use-products-query"
import type { Product } from "./-internal/shared/types"

import { DEFAULT_PAGE_SIZE } from "@/constants"
import { useTable } from "@/hooks/use-table"

export const Route = createFileRoute("/_authenticated/_layout/product-list/")({
  component: RouteComponent
})

function RouteComponent() {
  const { pagination, sorter, setToFirstPage, handleTableChange } = useTable<Product>()
  const [filters, setFilters] = useState<FormValues>(FILTER_INITIAL_VALUES)

  const handleFilterChange = (newFilters: FormValues) => {
    setFilters(newFilters)
    setToFirstPage()
  }

  // 查詢商品列表
  const { data, isLoading, isFetching, isPlaceholderData } = useProductsQuery({
    pagination: {
      page: pagination.current ?? 1,
      size: pagination.pageSize ?? DEFAULT_PAGE_SIZE
    },
    filters,
    sorter
  })

  const loading = isLoading || (isFetching && isPlaceholderData)
  const dataSource = data?.data ?? []
  const total = data?.count ?? 0

  return (
    <>
      {/* 篩選區 */}
      <Card className="mb-3">
        <ProductsFilter loading={loading} onFilterChange={handleFilterChange} />
      </Card>

      {/* 商品列表 */}
      <Card title="商品列表" extra={<ProductEditModal mode="CREATE" />}>
        <ProductsTable
          products={dataSource}
          loading={loading}
          pagination={{
            ...pagination,
            total: total,
            showSizeChanger: true
          }}
          onTableChange={handleTableChange}
        />
      </Card>
    </>
  )
}
