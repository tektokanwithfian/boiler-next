'use client'

import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import Layout from '@/components/app/layout'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/services/hooks/use-toast'

import type { lifeStages } from '@/services/utils'
import { getLifeStage } from '@/services/utils'
import type { Profile } from '@/types/user'

import { update } from './actions/actions'
import { schema } from './actions/schema'
import ContentExtended from './content-extended/content'
import ContentGeneral from './content-general/content'
import ContentGoal from './content-goal/content'
import ContentSubmit from './content-submit'

import type { z } from 'zod'

interface Props {
  data: Profile
}

function Component({ data }: Props) {
  const { toast } = useToast()
  const { user } = useUser()
  const router = useRouter()

  const { extended, goal } = data

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: {
      id: data.id!,
      active: data.active || false,
      dob: data.dob ? new Date(data.dob) : new Date(),
      height: data.height ? `${data.height}` : '',
      lifeStage: data.lifeStage
        ? data.lifeStage as typeof lifeStages[number]
        : getLifeStage(new Date()),
      name: data.name!,
      sex: data.sex! as 'male' | 'female' | 'other',
      weight: data.weight ? `${data.weight}` : '',
      goal: goal && goal.code ? goal.code : 'general-health',
      allergies: extended && extended.allergies
        ? extended.allergies : '',
      familyHealthHistory: extended && extended.familyHealthHistory
        ? extended.familyHealthHistory
        : '',
      healthCondition: extended && extended.healthCondition
        ? extended.healthCondition
        : '',
      medications: extended && extended.medications
        ? extended.medications
        : '',
      physicalActivityLevel: extended && extended.physicalActivityLevel
        ? extended.physicalActivityLevel
        : '',
    },
  })

  const { executeAsync, status } = useAction(update, {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Your profile has been successfully created.',
      })
    },
    onExecute: () => {
      toast({
        title: 'Executing...',
        description: 'Please wait, while your profile is being created.',
      })
    },
    onError: ({ error }) => {
      if (error.serverError) {
        toast({
          title: 'Something went wrong',
          description: error.serverError as string,
          variant: 'destructive',
        })
      }
      if (error.validationErrors) {
        toast({
          title: 'Something went wrong',
          description: JSON.stringify(error.validationErrors),
          variant: 'destructive',
        })
      }
    },
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    await executeAsync(values)
    await user?.reload()

    router.push(`/profile/${data.id}`)
    window.location.replace(`/profile/${data.id}`)
  }
  return (
    <Layout>
      <div className="relative flex flex-1 flex-col gap-4">
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-16 rounded-full"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-8" />
        </Button>
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ContentGeneral form={form} />
              <Separator className="my-6" />
              <ContentExtended form={form} />
              <Separator className="my-6" />
              <ContentGoal form={form} />
              <Separator className="mt-6 mb-2" />
              <ContentSubmit status={status} />
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  )
}

export default Component
