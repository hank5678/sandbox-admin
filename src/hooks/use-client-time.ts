import { useEffect, useState } from "react"

const useClientTime = () => {
  const [clientTime, setClientTime] = useState(new Date().getTime())

  useEffect(() => {
    const timer = setInterval(() => {
      setClientTime(new Date().getTime())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return clientTime
}

export default useClientTime
