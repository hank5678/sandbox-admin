import { blue, green } from "@ant-design/colors"
import { Card } from "antd"
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const orderToVisitorComparisons = [
  { time: "2024-01-01", sales: 38000, visitors: 5200 },
  { time: "2024-01-02", sales: 52000, visitors: 6100 },
  { time: "2024-01-03", sales: 48000, visitors: 5500 },
  { time: "2024-01-04", sales: 61000, visitors: 8300 },
  { time: "2024-01-05", sales: 55000, visitors: 7200 },
  { time: "2024-01-06", sales: 67000, visitors: 9100 },
  { time: "2024-01-07", sales: 76000, visitors: 10500 },
  { time: "2024-01-08", sales: 81000, visitors: 12200 },
  { time: "2024-01-09", sales: 66000, visitors: 11500 },
  { time: "2024-01-10", sales: 83000, visitors: 13500 },
  { time: "2024-01-11", sales: 88000, visitors: 14000 },
  { time: "2024-01-12", sales: 69000, visitors: 12100 },
  { time: "2024-01-13", sales: 72000, visitors: 11500 },
  { time: "2024-01-14", sales: 74000, visitors: 13500 },
  { time: "2024-01-15", sales: 92000, visitors: 16500 }
]

const OrderVisitorComparison = () => {
  return (
    <Card title="訂單量與訪客數對比">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={orderToVisitorComparisons}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="sales" name="訂單額" fill={blue[4]} radius={[8, 8, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="visitors" name="日訪客數" stroke={green[4]} strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}

export { OrderVisitorComparison }
