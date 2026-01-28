import { blue } from "@ant-design/colors"
import { Card, Progress } from "antd"

const operationalMetrics = [
  { name: "庫存充足度", value: 78 },
  { name: "訂單準時交付率", value: 94 },
  { name: "客戶滿意度", value: 89 }
]

const OperationalMetrics = () => {
  return (
    <Card title="營運指標" className="h-full">
      {operationalMetrics.map((item) => (
        <div key={item.name} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span>{item.name}</span>
            <span style={{ fontWeight: 600 }}>{item.value}%</span>
          </div>
          <Progress percent={item.value} strokeColor={{ "0%": blue[2], "100%": blue[4] }} />
        </div>
      ))}
    </Card>
  )
}

export { OperationalMetrics }
