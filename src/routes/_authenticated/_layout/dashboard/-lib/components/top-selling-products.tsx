import { Card, Rate, Table, Tag } from "antd"

const topSellingProductColumns = [
  {
    title: "排名",
    dataIndex: "rank",
    key: "rank",
    render: (text: string) => <strong>{text}</strong>
  },
  {
    title: "武器名稱",
    dataIndex: "weaponName",
    key: "weaponName"
  },
  {
    title: "銷售數量",
    dataIndex: "salesCount",
    key: "salesCount"
  },
  {
    title: "星級評分",
    dataIndex: "rating",
    key: "rating",
    render: (rating: number) => <Rate disabled defaultValue={rating} />
  },
  {
    title: "庫存",
    dataIndex: "inventory",
    key: "inventory",
    render: (inventory: number) => <Tag color={inventory > 50 ? "green" : inventory > 20 ? "orange" : "red"}>{inventory}件</Tag>
  }
]

const topSellingProducts = [
  { key: "1", rank: 1, weaponName: "聖劍·阿瓦隆", salesCount: 342, rating: 5, inventory: 12 },
  { key: "2", rank: 2, weaponName: "龍鱗弓", salesCount: 298, rating: 4, inventory: 8 },
  { key: "3", rank: 3, weaponName: "魔法杖·紫月", salesCount: 276, rating: 5, inventory: 5 },
  { key: "4", rank: 4, weaponName: "暗黑戰斧", salesCount: 215, rating: 4, inventory: 18 },
  { key: "5", rank: 5, weaponName: "精靈匕首", salesCount: 189, rating: 3, inventory: 35 }
]

const TopSellingProducts = () => {
  return (
    <Card title="熱銷商品排行" className="h-full">
      <Table columns={topSellingProductColumns} dataSource={topSellingProducts} pagination={false} size="small" bordered={false} />
    </Card>
  )
}

export { TopSellingProducts }
