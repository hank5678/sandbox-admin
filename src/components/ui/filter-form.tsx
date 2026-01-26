import { DownOutlined } from "@ant-design/icons"
import { RedoOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Col, Form, type FormProps, Grid, Row, Space } from "antd"
import { Children, type PropsWithChildren, useCallback, useState } from "react"

import { classNames } from "@/utils/class-names"

const { useBreakpoint } = Grid

type Props<t> = FormProps<t> &
  PropsWithChildren & {
    collapsed?: boolean
    defaultCollapsed?: boolean
    onCollapse?: (collapsed: boolean) => void
    loading?: boolean
  }

const spans: Record<string, number> = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6
}

function FilterForm<t>({ defaultCollapsed, children, onReset, loading, onFinish, form, ...formProps }: Props<t>) {
  const [customForm] = Form.useForm()
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  const formInstance = form ?? customForm

  const collapsedText = collapsed ? "展開" : "收起"
  const screens = useBreakpoint()

  const currentScreen =
    Object.entries(screens)
      .filter((screen) => screen[1])
      .pop()?.[0] || "xs"

  const collapsedCount = Math.max(24 / spans[currentScreen] - 2, 0)

  const needCollapse = Children.count(children) > collapsedCount + 1

  const handleCollapseClick = useCallback(() => {
    setCollapsed((prev) => !prev)
  }, [])

  return (
    <Form
      form={formInstance}
      requiredMark={false}
      onFinish={(values) => {
        onFinish?.({ ...values, _ts: Date.now() })
      }}
      onReset={(event) => {
        onReset?.(event)
      }}
      {...formProps}
    >
      <Row gutter={16}>
        {Children.map(children, (child, id) => (
          <Col
            {...spans}
            key={id}
            className={classNames("[&_.ant-input-number]:w-full [&_.ant-picker]:w-full", {
              hidden: collapsed && id > collapsedCount
            })}
          >
            {child}
          </Col>
        ))}
        <Col {...spans} className="ml-auto flex items-start justify-end">
          <Space size="small" align="center">
            <Button type="primary" htmlType="submit" loading={loading} icon={<SearchOutlined />}>
              查詢
            </Button>
            <Button htmlType="reset" disabled={loading} icon={<RedoOutlined />}>
              重置
            </Button>

            {needCollapse && (
              <div className="text-blue-6 ml-2 cursor-pointer whitespace-nowrap" onClick={handleCollapseClick}>
                <span className="mr-1">{collapsedText}</span>
                <DownOutlined
                  className={classNames({
                    "rotate-180": !collapsed
                  })}
                />
              </div>
            )}
          </Space>
        </Col>
      </Row>
    </Form>
  )
}

FilterForm.Item = Form.Item

export { FilterForm }
