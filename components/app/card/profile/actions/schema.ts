import { z } from 'zod'

export const schema = z.object({
  id: z.string().min(1, 'Profile ID is required'),
})
