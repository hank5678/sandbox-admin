import { DollarOutlined, ShoppingCartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"
import { Card, Col, Row, Statistic } from "antd"

import { formatCurrency } from "@/utils/format-currency"

const data = [
  {
    title: "總銷售額",
    value: formatCurrency(856400, { showSymbol: false }),
    prefix: <DollarOutlined />
  },
  {
    title: "訪客數",
    value: 12846,
    prefix: <UserOutlined />,
    suffix: "人"
  },
  {
    title: "庫存數量",
    value: 1102,
    prefix: <ShoppingCartOutlined />,
    suffix: "件"
  },
  {
    title: "新增訂單",
    value: 156,
    prefix: <TeamOutlined />
  }
]

const OverallStatistics = () => {
  return (
    <Row gutter={[16, 16]} className="mb-4">
      {data.map((stat, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <Card style={{ boxShadow: "0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02)" }}>
            <Statistic title={stat.title} value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export { OverallStatistics }
