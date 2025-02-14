'use server'

import { revalidatePath } from 'next/cache'
import document from '@/services/interface/document/profile/actions'
import { action } from '@/services/interface/form/client'

import { schema } from './schema'

export const remove = action
  .schema(schema)
  .action(async ({ parsedInput: values }) => {
    try {
      const parsed = schema.parse(values)

      const { result, error } = await document.remove({ id: parsed.id })

      if (!result && error) {
        throw new Error(error.message)
      }

      revalidatePath('/profile')

      return {
        message: 'Profile has been successfully removed',
        result,
      }
    } catch (error) {
      const e = error as Error
      return { message: JSON.stringify(e) }
    }
  })
