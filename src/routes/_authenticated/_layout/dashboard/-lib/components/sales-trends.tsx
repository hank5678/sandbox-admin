import { blue } from "@ant-design/colors"
import { Card } from "antd"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "1月", value: 38000 },
  { month: "2月", value: 52000 },
  { month: "3月", value: 48000 },
  { month: "4月", value: 71000 },
  { month: "5月", value: 65000 },
  { month: "6月", value: 87000 },
  { month: "7月", value: 94000 },
  { month: "8月", value: 76000 },
  { month: "9月", value: 89000 },
  { month: "10月", value: 97000 },
  { month: "11月", value: 99000 },
  { month: "12月", value: 108000 }
]
const SalesTrends = () => {
  return (
    <Card title="銷售額趨勢">
      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={blue[5]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={blue[5]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke={blue[5]} fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export { SalesTrends }
