import { Col, Form, Input, InputNumber, Row, Select } from "antd"

import { IS_TRADEABLE_MAP, RARITY_MAP, TYPE_MAP } from "../../shared/constants"

import { convertMapToOptions } from "@/utils/convert-map-to-options"

const TYPE_OPTIONS = convertMapToOptions(TYPE_MAP, ["all", "unknown"])
const RARITY_OPTIONS = convertMapToOptions(RARITY_MAP, ["all", "unknown"])
const IS_TRADEABLE_OPTIONS = convertMapToOptions(IS_TRADEABLE_MAP, ["all"])

const FormFields = () => (
  <Row gutter={[16, 16]}>
    <Col span={24}>
      <Form.Item label="名稱" name="name" rules={[{ required: true, message: "請輸入名稱" }]}>
        <Input placeholder="請輸入" />
      </Form.Item>
    </Col>

    <Col span={8}>
      <Form.Item label="類型" name="type" rules={[{ required: true, message: "請選擇類型" }]}>
        <Select placeholder="請選擇">
          {TYPE_OPTIONS.map(({ label, value }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Col>

    <Col span={8}>
      <Form.Item label="品質" name="rarity" rules={[{ required: true, message: "請選擇品質" }]}>
        <Select placeholder="請選擇">
          {RARITY_OPTIONS.map(({ label, value }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Col>

    <Col span={8}>
      <Form.Item label="等級需求" name="levelRequirement" rules={[{ required: true, message: "請輸入等級需求" }]}>
        <InputNumber min={0} max={100} className="w-full" placeholder="請輸入" />
      </Form.Item>
    </Col>

    <Col span={12}>
      <Form.Item label="價格" name="price" rules={[{ required: true, message: "請輸入價格" }]}>
        <InputNumber min={0} className="w-full" placeholder="請輸入" />
      </Form.Item>
    </Col>

    <Col span={12}>
      <Form.Item label="是否可交易" name="isTradeable" rules={[{ required: true, message: "請選擇是否可交易" }]}>
        <Select placeholder="請選擇">
          {IS_TRADEABLE_OPTIONS.map(({ label, value }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
  </Row>
)

export { FormFields }
