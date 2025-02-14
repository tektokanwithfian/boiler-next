'use client'

import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import Layout from '@/components/app/layout'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/services/hooks/use-toast'
import { getLifeStage } from '@/services/utils'

import { create } from './actions/actions'
import { schema } from './actions/schema'

import ContentExtended from './content-extended/content'
import ContentGeneral from './content-general/content'
import ContentGoal from './content-goal/content'
import ContentSubmit from './content-submit'

import type { z } from 'zod'

function Component() {
  const { toast } = useToast()
  const { user } = useUser()
  const router = useRouter()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      active: false,
      dob: new Date(),
      height: '',
      lifeStage: getLifeStage(new Date()),
      name: '',
      sex: undefined,
      weight: '',
      goal: 'general-health',
    },
  })

  const { executeAsync, status } = useAction(create, {
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

    router.push('/profile')
    window.location.replace('/profile')
  }
  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-4">
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
