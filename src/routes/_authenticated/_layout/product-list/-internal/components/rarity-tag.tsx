import { Tag } from "antd"

import { RARITY_COLOR_MAP, RARITY_MAP } from "../shared/constants"

interface RarityTagProps {
  value: string
}

const RarityTag = ({ value }: RarityTagProps) => <Tag color={RARITY_COLOR_MAP[value]}>{RARITY_MAP[value] ?? value}</Tag>

export { RarityTag }
