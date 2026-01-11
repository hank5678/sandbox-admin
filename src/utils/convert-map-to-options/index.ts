import * as R from "remeda"

const entriesOf = <T extends Record<string, string>>(obj: T) => Object.entries(obj) as Array<[keyof T, T[keyof T]]>

export const convertMapToOptions = <const T extends Record<string, string>, const Excluded extends ReadonlyArray<keyof T> = []>(
  data: T,
  exclude: Excluded = [] as unknown as Excluded
) =>
  R.pipe(
    entriesOf(data),
    R.filter(([value]) => !exclude.includes(value)),
    R.map(([value, label]) => ({
      label,
      value
    }))
  ) as Array<
    {
      [K in Exclude<keyof T, Excluded[number]>]: {
        value: K
        label: T[K]
      }
    }[Exclude<keyof T, Excluded[number]>]
  >
