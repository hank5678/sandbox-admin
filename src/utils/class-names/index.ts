import OriginalClassNames, { type ArgumentArray } from "classnames"
import { twMerge } from "tailwind-merge"

export const classNames = (...args: ArgumentArray) => {
  return twMerge(OriginalClassNames(args))
}
