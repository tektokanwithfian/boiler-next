import { z } from 'zod'

export const schema = z.object({
  file: z.object({
    key: z.string(),
    name: z.string(),
    type: z.string(),
  }),
})
