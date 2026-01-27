import * as z from "zod"

export const productSchema = z
  .object({
    id: z.number(),
    name: z.string().default(""),
    type: z.string().default("unknown"),
    rarity: z.string().default("unknown"),
    levelRequirement: z.number().default(1),
    isTradeable: z
      .boolean()
      .default(false)
      .transform((value) => (value ? "yes" : "no") as string),
    price: z.number().default(0),
    createdAt: z.string().transform((value) => new Date(value).getTime())
  })
  .transform(({ createdAt: createdTime, ...rest }) => ({
    createdTime,
    ...rest
  }))

export type Product = z.infer<typeof productSchema>
