'use client'

import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import Spinner from '@/components/app/spinner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/services/hooks/use-toast'
import { getLifeStage } from '@/services/utils'

import { create } from './actions/actions'
import { schema } from './actions/schema'
import Avatar from './content-avatar'
import Dob from './content-dob'
import Height from './content-height'
import Lifestage from './content-lifestage'
import Name from './content-name'
import Sex from './content-sex'
import Terms from './content-terms'
import Weight from './content-weight'

import type { z } from 'zod'

function Component() {
  const { toast } = useToast()
  const { user } = useUser()
  const router = useRouter()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      dob: new Date(),
      height: '',
      lifeStage: getLifeStage(new Date()),
      name: '',
      sex: undefined,
      terms: false,
      weight: '',
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

    router.push('/')
    window.location.replace('/')
  }

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Tell us more about you</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <Avatar form={form} />
            <Name form={form} />
            <Dob form={form} />
            <Lifestage form={form} />
            <Height form={form} />
            <Weight form={form} />
            <Sex form={form} />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Separator />
            <Terms form={form} />
            <div className="w-full flex justify-end gap-2">
              <Button variant="outline" disabled={status === 'executing'}>Cancel</Button>
              <Button type="submit" disabled={status === 'executing'}>
                {(status === 'executing') && (<Spinner />)}
                Submit
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default Component
