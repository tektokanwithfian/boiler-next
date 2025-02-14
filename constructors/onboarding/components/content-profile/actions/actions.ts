'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import document from '@/services/interface/document/profile/actions'
import { action } from '@/services/interface/form/client'

import type { Profile } from '@/types/user'
import { schema } from './schema'

export const create = action
  .schema(schema)
  .action(async ({ parsedInput: values }) => {
    try {
      const parsed = schema.parse(values)

      const doc: Profile = {
        active: true,
        dob: new Date(parsed.dob).getTime(),
        height: Number(parsed.height),
        lifeStage: parsed.lifeStage,
        name: parsed.name,
        sex: parsed.sex,
        weight: Number(parsed.weight),
      }

      const { result, error } = await document.create({ doc })

      if (!result && error) {
        throw new Error(error.message)
      }

      const { userId } = await auth()

      if (!userId) {
        throw new Error('No logged in user')
      }

      const client = await clerkClient()

      const res = await client.users.updateUser(userId, {
        publicMetadata: {
          onboardingCompleted: true,
        },
      })

      revalidatePath('/onboarding')

      return {
        message: res.publicMetadata,
        result,
      }
    } catch (error) {
      const e = error as Error
      return { message: JSON.stringify(e) }
    }
  })
