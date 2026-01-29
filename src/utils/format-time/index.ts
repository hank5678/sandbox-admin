import dayjs from "dayjs"

export type FormatTimeType = "YEAR_MONTH_DAY" | "YEAR_TO_SECOND" | "MONTH_DAY" | "MONTH_TO_SECOND" | "HOUR_MINUTE_SECOND" | "HOUR_MINUTE" | "RELATIVE"

export interface FormatTimeOptions {
  /**
   * 時間格式類型
   * - `"YEAR_TO_SECOND"`：由年開始，精確至秒。例如 `2026/01/25 14:30:05`
   * - `"YEAR_MONTH_DAY"`：由年開始，精確至日。例如 `2026/01/25`
   * - `"MONTH_DAY"`：由月開始，精確至日。例如 `01/25`
   * - `"MONTH_TO_SECOND"`：由月開始，精確至秒。例如 `01/25 14:30:05`
   * - `"HOUR_MINUTE_SECOND"`：由時開始，精確至秒。例如 `14:30:05`
   * - `"HOUR_MINUTE"`：由時開始，精確至分。例如 `14:30`
   * - `"RELATIVE"`：處理相對時間。例如 `昨天 14:30`
   * @default "YEAR_TO_SECOND"
   */
  type?: FormatTimeType
  /**
   * 時區代碼
   * - 支援 IANA 時區格式，例如 "Asia/Taipei"、"America/New_York"
   * - 支援 UTC offset 格式，例如 "+0800"、"-0500"
   * @default 使用系統時區
   * @example
   * formatTime(timestamp, { timezone: "Asia/Taipei" })
   * formatTime(timestamp, { timezone: "+0800" })
   */
  timezone?: string
}

const TIMESTAMP_UNIT_THRESHOLD = 1e11
const INVALID_TIME_OUTPUT = "-"

const YEAR_MONTH_DAY_FORMAT = "YYYY/MM/DD"
const HOUR_MINUTE_SECOND_FORMAT = "HH:mm:ss"
const HOUR_MINUTE_FORMAT = "HH:mm"
const MONTH_DAY_FORMAT = "MM/DD"

const FORMATS: Record<Exclude<FormatTimeType, "RELATIVE">, string> = {
  YEAR_MONTH_DAY: YEAR_MONTH_DAY_FORMAT,
  YEAR_TO_SECOND: `${YEAR_MONTH_DAY_FORMAT} ${HOUR_MINUTE_SECOND_FORMAT}`,
  MONTH_DAY: MONTH_DAY_FORMAT,
  MONTH_TO_SECOND: `${MONTH_DAY_FORMAT} ${HOUR_MINUTE_SECOND_FORMAT}`,
  HOUR_MINUTE_SECOND: HOUR_MINUTE_SECOND_FORMAT,
  HOUR_MINUTE: HOUR_MINUTE_FORMAT
}

/** 判斷是否為毫秒時間戳 (西元 5138 年之前適用) */
const isMillisecond = (timestamp: number): boolean => Math.abs(timestamp) > TIMESTAMP_UNIT_THRESHOLD

const getRelativeTime = (date: dayjs.Dayjs, timezone?: string): string => {
  const now = timezone ? dayjs().tz(timezone).startOf("day") : dayjs().startOf("day")
  const msgDay = date.startOf("day")
  const diffDays = now.diff(msgDay, "day")
  const timeStr = date.format(HOUR_MINUTE_FORMAT)
  switch (diffDays) {
    case 0:
      return `今天 ${timeStr}`
    case 1:
      return `昨天 ${timeStr}`
    case 2:
      return `前天 ${timeStr}`
    default:
      return date.format(`${MONTH_DAY_FORMAT} ${HOUR_MINUTE_FORMAT}`)
  }
}

/**
 * 格式化時間
 * @param value 時間戳記 (毫秒或秒)
 * @param options 格式化選項
 * @param options.type 時間格式類型 (預設: "YEAR_TO_SECOND")
 * @param options.timezone 時區代碼，支援 IANA 格式或 UTC offset 格式
 * @returns 格式化後的日期字串
 */
function formatTime(value?: number | string | null, { type = "YEAR_TO_SECOND", timezone }: FormatTimeOptions = {}): string {
  const numValue = Number(value)

  if (value == null || Number.isNaN(numValue) || !Number.isFinite(numValue)) {
    return INVALID_TIME_OUTPUT
  }

  const milliseconds = isMillisecond(numValue) ? numValue : numValue * 1000
  // 根據是否指定時區來決定是否轉換時區
  const date = timezone ? dayjs(milliseconds).tz(timezone) : dayjs(milliseconds)

  if (!date.isValid()) return INVALID_TIME_OUTPUT

  if (type === "RELATIVE") {
    return getRelativeTime(date, timezone)
  } else {
    return date.format(FORMATS[type])
  }
}

export { formatTime }
