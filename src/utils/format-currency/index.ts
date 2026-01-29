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
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

  return parts.length > 1 ? parts.join(decimalSeparator) : parts[0]
}

const CURRENCY_CONFIG: Record<Currency, { symbol: string; divider: number; precision: number; thousandSeparator: string; decimalSeparator: string }> = {
  TWD: { symbol: "NT$ ", divider: 1, precision: 0, thousandSeparator: ",", decimalSeparator: "." },
  IDR: { symbol: "Rp ", divider: 1, precision: 0, thousandSeparator: ".", decimalSeparator: "," },
  USD: { symbol: "$", divider: 100, precision: 2, thousandSeparator: ",", decimalSeparator: "." },
  VND: { symbol: "₫ ", divider: 1, precision: 0, thousandSeparator: ".", decimalSeparator: "," }
}

function formatCurrency(amount: number | string = 0, options?: FormatCurrencyOptions): string {
  const numValue = Number(amount)

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
