import Decimal from "decimal.js"

export type Currency = "TWD" | "IDR" | "USD" | "VND"

export type FormatCurrencyOptions = {
  currency?: Currency
  showSymbol?: boolean
  precision?: number
}

/**
 * 內部格式化數字函式
 */
function formatNumber(amount: number, thousandSeparator: string, decimalSeparator: string, precision: number): string {
  const decimalAmount = new Decimal(amount).toDecimalPlaces(precision, Decimal.ROUND_DOWN)
  const formatted = decimalAmount.toFixed(precision)

  const parts = formatted.split(".")
  // 處理千分位
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

  // 如果 precision 為 0，不需要組合小數部分
  return parts.length > 1 ? parts.join(decimalSeparator) : parts[0]
}

/**
 * 貨幣配置：直接定義該貨幣的顯示習慣
 */
const CURRENCY_CONFIG: Record<Currency, { symbol: string; divider: number; precision: number; thousandSeparator: string; decimalSeparator: string }> = {
  TWD: { symbol: "NT$ ", divider: 1, precision: 0, thousandSeparator: ",", decimalSeparator: "." },
  IDR: { symbol: "Rp ", divider: 1, precision: 0, thousandSeparator: ".", decimalSeparator: "," },
  USD: { symbol: "$", divider: 100, precision: 2, thousandSeparator: ",", decimalSeparator: "." },
  VND: { symbol: "₫ ", divider: 1, precision: 0, thousandSeparator: ".", decimalSeparator: "," }
}

/**
 * 格式化貨幣數值 (以 Currency 決定格式)
 */
function formatCurrency(amount: number | string = 0, options?: FormatCurrencyOptions): string {
  const numValue = Number(amount)

  // 安全檢查：處理 null, undefined, NaN 或 業務邏輯中的 0
  // 如果你希望 0 顯示 "NT$ 0" 而不是 "-"，請改為 if (amount === "" || amount == null || isNaN(numValue))
  if (!numValue && numValue !== 0) {
    return "-"
  }
  if (numValue === 0) {
    return "-"
  }

  const { currency = "TWD", showSymbol = true, precision } = options ?? {}

  // 取得該貨幣對應的完整格式設定
  const config = CURRENCY_CONFIG[currency]

  const amountInBaseUnit = new Decimal(numValue).div(config.divider).toNumber()
  const finalPrecision = precision ?? config.precision

  const formattedNum = formatNumber(amountInBaseUnit, config.thousandSeparator, config.decimalSeparator, finalPrecision)

  return `${showSymbol ? config.symbol : ""}${formattedNum}`
}

export { formatCurrency }
