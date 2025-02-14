import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import Spinner from '@/components/app/spinner'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/services/hooks/use-toast'
import type { Profile } from '@/types/user'
import { remove } from './actions/actions'
import { schema } from './actions/schema'
import type { z } from 'zod'

interface Props {
  item: Profile
}

function Component({ item }: Props) {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: item.id,
    },
  })

  const { executeAsync, status } = useAction(remove, {
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

    router.push('/profile')
    window.location.replace('/profile')
  }

  return (
    <>
      <Separator />
      <CardFooter className="justify-end p-0">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => router.push(`/profile/${item.id}`)}
          >
            <Pencil />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full"
              >
                <Trash />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Remove Profile</DialogTitle>
                <DialogDescription>
                  {'Are you sure you want to remove the '}
                  <span className="font-bold text-destructive">
                    {item.name}
                  </span>
                  {' profile?'}
                  <br />
                  This action can not be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <div className="w-full flex flex-col gap-2">
                  <Separator />
                  <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        disabled={status === 'executing'}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Button
                          type="submit"
                          variant="destructive"
                          disabled={status === 'executing'}
                        >
                          {(status === 'executing') && (<Spinner />)}
                          Yes, i am sure
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </>
  )
}

export default Component
