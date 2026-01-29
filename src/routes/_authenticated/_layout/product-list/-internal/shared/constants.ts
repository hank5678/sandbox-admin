/** 武器類型映射 */
export const TYPE_MAP: Record<string, string> = {
  all: "全部",
  sword: "劍",
  spear: "長矛",
  axe: "斧頭",
  mace: "戰鎚",
  dagger: "匕首",
  bow: "弓箭",
  crossbow: "弩",
  unknown: "未知"
}

/** 品質映射 */
export const RARITY_MAP: Record<string, string> = {
  all: "全部",
  common: "普通",
  rare: "稀有",
  epic: "史詩",
  legendary: "傳說",
  unknown: "未知"
}

/** 品質顏色映射 */
export const RARITY_COLOR_MAP: Record<string, string> = {
  common: "default",
  rare: "blue",
  epic: "purple",
  legendary: "orange",
  unknown: "default"
}

/** 是否可交易映射 */
export const IS_TRADEABLE_MAP: Record<string, string> = {
  all: "全部",
  yes: "是",
  no: "否"
}

/** 預設等級範圍 */
export const DEFAULT_LEVEL_RANGE = [0, 100] as const
