import * as z from "zod"

export const schema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  rarity: z.string().optional(),
  levelRequirement: z.tuple([z.number(), z.number()]).optional(),
  isTradeable: z.string().optional(),
  price: z.number().optional()
})

export type FormValues = z.infer<typeof schema>
