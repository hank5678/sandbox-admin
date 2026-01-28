import * as z from "zod"

export const schema = z.object({
  name: z.string(),
  type: z.string(),
  rarity: z.string(),
  levelRequirement: z.number(),
  isTradeable: z.string(),
  price: z.number()
})

export type FormValues = z.infer<typeof schema>
