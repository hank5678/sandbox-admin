import dayjs from "dayjs"
import * as z from "zod"

const dayjsSchema = z.custom<dayjs.Dayjs>((value) => dayjs.isDayjs(value))

export type Status = "pending" | "processing" | "shipped" | "completed" | "cancelled"

export const statusMap: Record<Status, string> = {
  pending: "待付款",
  processing: "處理中",
  shipped: "已出貨",
  completed: "已完成",
  cancelled: "已取消"
}

export const statusColorMap: Record<Status, string> = {
  pending: "orange",
  processing: "blue",
  shipped: "blue",
  completed: "green",
  cancelled: "red"
}

export const INIT_VALUES: FormValues = {
  id: "",
  customerName: "",
  status: "",
  orderTime: []
}

export type FormValues = z.infer<typeof schema>

export const schema = z.object({
  id: z.string().optional(),
  customerName: z.string().optional(),
  status: z.enum(["", "pending", "processing", "shipped", "completed", "cancelled"]).optional(),
  orderTime: z.tuple([dayjsSchema.optional(), dayjsSchema.optional()]).nullable().optional()
})
