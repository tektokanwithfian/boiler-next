'use server'

import { revalidatePath } from 'next/cache'
import { generate } from '@/services/interface/ai/ai-generate'
import document from '@/services/interface/document/diary/actions'
import { action } from '@/services/interface/form/client'

import type { Diary } from '@/types/diary'
import { schema } from './schema'

export const create = action
  .schema(schema)
  .action(async ({ parsedInput: values }) => {
    try {
      const parsed = schema.parse(values)

      const generated = await generate({ key: parsed.file.key, type: parsed.file.type })
      if (!generated.result && generated.error) {
        throw new Error(generated.error.message)
      }
      const diary = JSON.parse((generated.result as string)) as Diary
      const doc: Diary = {
        file: parsed.file,
        ...diary as Diary,
      }

      const { result, error } = await document.create({ doc })

      if (!result && error) {
        throw new Error(error.message)
      }

      revalidatePath('/')

      return { result }
    } catch (error) {
      const e = error as Error
      return { message: JSON.stringify(e) }
    }
  })
