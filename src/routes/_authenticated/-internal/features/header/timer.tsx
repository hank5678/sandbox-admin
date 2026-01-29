import { Typography } from "antd"

import useClientTime from "@/hooks/use-client-time"
import { formatTime } from "@/utils/format-time"

const { Text } = Typography

const Timer = () => {
  const clientTime = useClientTime()
  return (
    <Text code>
      系統時間：<span>{formatTime(clientTime, { timezone: "+0800" })}</span>
    </Text>
  )
}

export { Timer }
