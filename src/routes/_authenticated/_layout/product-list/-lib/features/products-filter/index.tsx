import { Input, InputNumber, Select, Slider } from "antd"

import { DEFAULT_LEVEL_RANGE } from "../../shared/constants"
import { FILTER_INITIAL_VALUES, IS_TRADEABLE_OPTIONS, RARITY_OPTIONS, TYPE_OPTIONS } from "./constants"
import type { FormValues } from "./schema"
import { schema } from "./schema"

import { FilterForm } from "@/components/ui/filter-form"

interface ProductsFilterProps {
  loading: boolean
  onFilterChange: (filters: FormValues) => void
}

const ProductsFilter = ({ loading, onFilterChange }: ProductsFilterProps) => {
  const handleFinish = (values: unknown) => {
    const parsed = schema.parse(values)
    onFilterChange(parsed)
  }

  return (
    <FilterForm loading={loading} onFinish={handleFinish} initialValues={FILTER_INITIAL_VALUES}>
      <FilterForm.Item label="名稱" name="name">
        <Input type="text" placeholder="請輸入" />
      </FilterForm.Item>

      <FilterForm.Item label="類型" name="type">
        <Select placeholder="請選擇">
          {TYPE_OPTIONS.map(({ label, value }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </FilterForm.Item>

      <FilterForm.Item label="品質" name="rarity">
        <Select placeholder="請選擇">
          {RARITY_OPTIONS.map(({ label, value }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </FilterForm.Item>

      <FilterForm.Item label="等級需求" name="levelRequirement">
        <Slider range min={DEFAULT_LEVEL_RANGE[0]} max={DEFAULT_LEVEL_RANGE[1]} />
      </FilterForm.Item>

      <FilterForm.Item label="是否可交易" name="isTradeable">
        <Select placeholder="請選擇">
          {IS_TRADEABLE_OPTIONS.map(({ label, value }) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </FilterForm.Item>

      <FilterForm.Item label="價格" name="price">
        <InputNumber placeholder="請輸入" className="w-full" />
      </FilterForm.Item>
    </FilterForm>
  )
}

export { ProductsFilter }
