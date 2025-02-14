'use server'

import { revalidatePath } from 'next/cache'
import document from '@/services/interface/document/profile/actions'
import { action } from '@/services/interface/form/client'
import { get } from '@/services/interface/search/search'

import type { Profile, ProfileGoal } from '@/types/user'
import { goals, schema } from './schema'

export const create = action
  .schema(schema)
  .action(async ({ parsedInput: values }) => {
    try {
      const parsed = schema.parse(values)

      if (parsed.active) {
        const { result: activated } = await get<Profile>({
          name: 'profile',
          paging: { limit: 1, page: 1 },
          query: { filter: 'active:true' },
        })
        if (activated && activated.items.length > 0) {
          const { id, ...doc } = activated.items[0]
          await document.update({
            id: activated.items[0].id!,
            doc: { ...doc, active: false },
          })
        }
      }

      const doc: Profile = {
        active: parsed.active,
        dob: new Date(parsed.dob).getTime(),
        height: Number(parsed.height),
        lifeStage: parsed.lifeStage,
        name: parsed.name,
        sex: parsed.sex,
        weight: Number(parsed.weight),
        extended: {
          allergies: parsed.allergies,
          familyHealthHistory: parsed.familyHealthHistory,
          healthCondition: parsed.healthCondition,
          medications: parsed.medications,
          physicalActivityLevel: parsed.physicalActivityLevel,
        },
        goal: goals
          .find((goal: ProfileGoal) => goal.code === parsed.goal),
      }

      const { result, error } = await document.create({ doc })

      if (!result && error) {
        throw new Error(error.message)
      }

      revalidatePath('/profile')

      return { result }
    } catch (error) {
      const e = error as Error
      return { message: JSON.stringify(e) }
    }
  })
