import { blue, gold, green, purple, red } from "@ant-design/colors"
import { Card } from "antd"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { type: "劍類", value: 4544 },
  { type: "弓箭", value: 3321 },
  { type: "魔法武器", value: 3113 },
  { type: "防具", value: 2341 },
  { type: "其他", value: 1231 }
]

const COLORS = [blue[4], green[4], gold[4], red[4], purple[4]]

const ProductTypeDistribution = () => {
  return (
    <Card title="商品類型分布">
      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={140} label>
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

export { ProductTypeDistribution }
