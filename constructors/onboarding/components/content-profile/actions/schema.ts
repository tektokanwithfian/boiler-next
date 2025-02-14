import { z } from 'zod'
import { lifeStages } from '@/services/utils'

export const schema = z.object({
  avatar: z.instanceof(File, { message: 'Please select an image' }).optional(),
  dob: z.date({
    required_error: 'Please select a date of birth.',
  }).max(new Date(), 'Date of birth cannot be in the future'),
  height: z.string().min(1, 'Height is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Please enter a valid height in cm (e.g., 175 or 175.5)'),
  lifeStage: z.enum(lifeStages, {
    required_error: 'Please select a life stage.',
  }),
  name: z.string()
    .min(2, 'Profile name must be at least 2 characters')
    .max(50, 'Profile name must be less than 50 characters'),
  sex: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select your sex.',
  }),
  terms: z.boolean().refine((value) => value === true, {
    message: 'You must accept the terms and conditions.',
  }),
  weight: z.string().min(1, 'Weight is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Please enter a valid weight in kg (e.g., 70 or 70.5)'),
})
