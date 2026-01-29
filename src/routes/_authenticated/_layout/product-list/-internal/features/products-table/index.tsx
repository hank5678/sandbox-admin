import { Table, type TablePaginationConfig, type TableProps } from "antd"
import { Space } from "antd"

import { RarityTag } from "../../components/rarity-tag"
import { TYPE_MAP } from "../../shared/constants"
import type { Product } from "../../shared/types"
import { ProductDeleteButton } from "../product-delete-button"
import { ProductEditModal } from "../product-edit-modal"
import { ProductTradeableSwitch } from "../product-tradeable-switch"

import { formatCurrency } from "@/utils/format-currency"
import { formatTime } from "@/utils/format-time"

interface ProductsTableProps {
  products: Product[]
  loading: boolean
  pagination: TablePaginationConfig
  onTableChange: TableProps<Product>["onChange"]
}

const ProductsTable = ({ products, loading, pagination, onTableChange }: ProductsTableProps) => {
  const columns: TableProps<Product>["columns"] = [
    {
      title: "名稱",
      dataIndex: "name",
      align: "center",
      fixed: "left" as const
    },
    {
      title: "類型",
      dataIndex: "type",
      align: "center",
      render: (type: string) => TYPE_MAP[type] ?? type
    },
    {
      title: "品質",
      dataIndex: "rarity",
      align: "center",
      render: (rarity: string) => <RarityTag value={rarity} />
    },
    {
      title: "等級需求",
      dataIndex: "levelRequirement",
      align: "center",
      sorter: true
    },
    {
      title: "可交易",
      dataIndex: "isTradeable",
      align: "center",
      render: (_, record: Product) => <ProductTradeableSwitch product={record} />
    },
    {
      title: "價格",
      dataIndex: "price",
      sorter: true,
      align: "right",
      render: (price: number) => formatCurrency(price)
    },
    {
      title: "創建時間",
      dataIndex: "createdTime",
      align: "center",
      sorter: true,
      render: (createdTime: number) => formatTime(createdTime)
    },
    {
      title: "操作",
      key: "actions",
      align: "center",
      fixed: "right" as const,
      render: (_: unknown, record: Product) => (
        <Space size="small">
          <ProductEditModal mode="UPDATE" product={record} />
          <ProductDeleteButton id={record.id} />
        </Space>
      )
    }
  ]

  return (
    <Table<Product>
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={products}
      pagination={{
        ...pagination,
        showSizeChanger: true
      }}
      scroll={{ x: "max-content" }}
      onChange={onTableChange}
      bordered
    />
  )
}

export { ProductsTable }
