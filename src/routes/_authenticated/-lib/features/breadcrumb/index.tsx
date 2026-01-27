import { HomeOutlined } from "@ant-design/icons"
import { Link, useLocation } from "@tanstack/react-router"
import { Breadcrumb as AntdBreadcrumb } from "antd"
import classNames from "classnames"
import { type ReactNode, useMemo } from "react"

interface BreadcrumbProps {
  className?: string
}

const SEGMENT_MAP: Record<string, { title: string; to?: string }> = {
  dashboard: { title: "儀表板" },
  "product-list": { title: "商品列表" },
  "order-management": { title: "訂單管理" },
  "order-list": { title: "訂單列表" },
  feedback: { title: "意見回饋" },
  setting: { title: "系統設定" }
}

type BreadcrumbItem = { title: ReactNode }

const buildItems = (pathname: string): BreadcrumbItem[] => {
  const normalized = pathname.replace(/\/+$/, "")
  const segments = normalized.split("/").filter(Boolean)

  const items: BreadcrumbItem[] = [
    {
      title: <HomeOutlined />
    }
  ]

  if (segments.length === 0) {
    return items
  }

  return items.concat(
    segments.map((segment, index): BreadcrumbItem => {
      const config = SEGMENT_MAP[segment]
      const isLast = index === segments.length - 1
      const title = config?.title ?? segment

      if (!isLast && config?.to) {
        return { title: <Link to={config.to}>{title}</Link> }
      }

      return { title }
    })
  )
}

const Breadcrumb = ({ className }: BreadcrumbProps) => {
  const location = useLocation()
  const items = useMemo(() => buildItems(location.pathname), [location.pathname])

  return <AntdBreadcrumb className={classNames("mb-4", className)} items={items} />
}

export { Breadcrumb }
