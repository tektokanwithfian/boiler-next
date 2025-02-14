import { z } from 'zod'
import { lifeStages } from '@/services/utils'
import type { ProfileGoal } from '@/types/user'

export const goals: ProfileGoal[] = [{
  code: 'general-health',
  label: 'General Health',
  description: 'Improve overall wellbeing through balanced and nutritious eating habits',
}, {
  code: 'weight-loss',
  label: 'Weight Loss',
  description: 'Support healthy and sustainable weight loss through balanced nutrition',
}, {
  code: 'weight-gain',
  label: 'Weight Gain',
  description: 'Support healthy weight gain and muscle building through proper nutrition',
}, {
  code: 'weight-maintenance',
  label: 'Weight Maintenance',
  description: 'Maintain current weight through balanced nutrition and portion control',
}, {
  code: 'sport-performance',
  label: 'Sport Performance',
  description: 'Optimize nutrition for athletic performance and recovery',
}, {
  code: 'blood-sugar',
  label: 'Managing Blood Sugar',
  description: 'Maintain stable blood glucose levels through dietary choices',
}, {
  code: 'cholesterol',
  label: 'Lowering Cholesterol',
  description: 'Improve cardiovascular health through cholesterol-conscious eating',
}, {
  code: 'digestive-health',
  label: 'Digestive Health',
  description: 'Support gut health and improve digestive comfort',
}, {
  code: 'energy-levels',
  label: 'Energy Levels',
  description: 'Maintain consistent energy throughout the day',
}, {
  code: 'immune-system',
  label: 'Immune System Support',
  description: 'Strengthen immune function through proper nutrition',
}, {
  code: 'mental-clarity',
  label: 'Mental Clarity',
  description: 'Enhance cognitive function and focus through diet',
}, {
  code: 'heart-health',
  label: 'Heart Health',
  description: 'Support cardiovascular health through heart-healthy eating',
}]

export const MAX_LENGTH = 300

export const schema = z.object({
  id: z.string(),
  active: z.boolean().optional(),
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
  weight: z.string().min(1, 'Weight is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Please enter a valid weight in kg (e.g., 70 or 70.5)'),

  /** Extended Information */
  allergies: z.string().max(MAX_LENGTH, {
    message: `Allergies must not exceed ${MAX_LENGTH} characters`,
  }).optional(),
  familyHealthHistory: z.string().max(MAX_LENGTH, {
    message: `Family history must not exceed ${MAX_LENGTH} characters`,
  }).optional(),
  healthCondition: z.string().max(MAX_LENGTH, {
    message: `Health conditions must not exceed ${MAX_LENGTH} characters`,
  }).optional(),
  medications: z.string().max(MAX_LENGTH, {
    message: `Medications must not exceed ${MAX_LENGTH} characters`,
  }).optional(),
  physicalActivityLevel: z.string().max(MAX_LENGTH, {
    message: `Physical activities must not exceed ${MAX_LENGTH} characters`,
  }).optional(),

  /** Goals */
  goal: z.enum(goals.map((goal) => goal.code) as [string, ...string[]]),
})
