import { DEFAULT_LEVEL_RANGE, IS_TRADEABLE_MAP, RARITY_MAP, TYPE_MAP } from "../../shared/constants"
import type { FormValues } from "./schema"

import { convertMapToOptions } from "@/utils/convert-map-to-options"

export const FILTER_INITIAL_VALUES: FormValues = {
  name: "",
  type: "all",
  rarity: "all",
  levelRequirement: [DEFAULT_LEVEL_RANGE[0], DEFAULT_LEVEL_RANGE[1]],
  isTradeable: "all",
  price: undefined
}

export const TYPE_OPTIONS = convertMapToOptions(TYPE_MAP, ["unknown"])
export const RARITY_OPTIONS = convertMapToOptions(RARITY_MAP, ["unknown"])
export const IS_TRADEABLE_OPTIONS = convertMapToOptions(IS_TRADEABLE_MAP)
