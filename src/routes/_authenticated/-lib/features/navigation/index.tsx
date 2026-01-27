import { CommentOutlined, DashboardOutlined, FileTextOutlined, ProductOutlined, SettingOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { Layout, Menu, type MenuProps } from "antd"

const { Sider } = Layout

const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.replace("/_authenticated/_layout", "")
  const pathToKey: Record<string, string> = {
    "/dashboard": "dashboard",
    "/product-list": "product-list",
    "/order-management/order-list": "order-list",
    "/order-management/feedback": "feedback",
    "/setting": "setting"
  }
  const currentKey = pathToKey[currentPath]
  const selectedKeys = currentKey ? [currentKey] : []

  const siderMenuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      label: "儀表板",
      icon: <DashboardOutlined />,
      onClick: () => navigate({ to: "/dashboard" })
    },
    {
      key: "product-list",
      label: "商品列表",
      icon: <ProductOutlined />,
      onClick: () => navigate({ to: "/product-list" })
    },
    {
      key: "orders",
      label: "訂單管理",
      icon: <FileTextOutlined />,
      children: [
        {
          key: "order-list",
          label: "訂單列表",
          icon: <UnorderedListOutlined />,
          onClick: () => navigate({ to: "/order-management/order-list" })
        },
        {
          key: "feedback",
          label: "意見回饋",
          icon: <CommentOutlined />,
          onClick: () => navigate({ to: "/order-management/feedback" })
        }
      ]
    },
    {
      key: "setting",
      label: "系統設定",
      icon: <SettingOutlined />,
      onClick: () => navigate({ to: "/setting" })
    }
  ]

  return (
    <Sider width={200} className="fixed top-0 left-0 h-full bg-transparent pt-16">
      <div className="border-gray-1 h-full w-full border-r shadow-md">
        <Menu
          className="bg-gray-1 p-2"
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={["orders"]}
          style={{ height: "100%", borderInlineEnd: 0 }}
          items={siderMenuItems}
        />
      </div>
    </Sider>
  )
}

export { Navigation }
