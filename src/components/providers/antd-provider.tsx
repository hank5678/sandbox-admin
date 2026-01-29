import { StyleProvider } from "@ant-design/cssinjs"
import { App, ConfigProvider } from "antd"
import zhTW from "antd/locale/zh_TW"
import { type PropsWithChildren } from "react"

const ANTDProvider = ({ children }: PropsWithChildren) => {
  return (
    <StyleProvider layer>
      <ConfigProvider locale={zhTW}>
        <App>{children}</App>
      </ConfigProvider>
    </StyleProvider>
  )
}

export { ANTDProvider }
