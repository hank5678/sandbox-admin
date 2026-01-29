import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Dropdown, Layout, type MenuProps, Modal, Typography } from "antd"

import { useAuthLogout } from "../../hooks/use-auth-logout"
import { Timer } from "./timer"

import { SITE_NAME } from "@/constants"
import { useAuthStore } from "@/hooks/use-auth-store"

const { Header: ANTDHeader } = Layout

const Header = () => {
  const session = useAuthStore((state) => state.session)
  const authLogoutMutation = useAuthLogout()
  const userEmail = session?.user.email ?? ""
  const dropdownMenuItems: MenuProps["items"] = [
    {
      key: "change-password",
      label: <a>修改密碼</a>
    },
    {
      key: "logout",
      label: (
        <a
          onClick={() => {
            Modal.confirm({
              title: "確定要登出嗎？",
              content: "登出後將返回登入頁面",
              onOk: () => {
                return authLogoutMutation.mutateAsync()
              }
            })
          }}
        >
          登出
        </a>
      )
    }
  ]

  return (
    <ANTDHeader className="bg-gray-1/60 border-gray-1 fixed top-0 left-0 z-10 flex h-16 w-full items-center justify-between border-b px-6 shadow-md backdrop-blur-xs">
      <div className="flex items-center">
        <Typography.Title level={4} className="mb-0">
          <span>{SITE_NAME}</span>
        </Typography.Title>
      </div>
      <div className="flex items-center">
        <div className="mr-2 leading-normal">
          <Timer />
        </div>

        <div className="leading-normal">
          <Dropdown menu={{ items: dropdownMenuItems }} placement="bottomLeft">
            <Button type="text" className="py-2">
              <Avatar size={24} icon={<UserOutlined />} />
              <span>{userEmail}</span>
            </Button>
          </Dropdown>
        </div>
      </div>
    </ANTDHeader>
  )
}

export { Header }
