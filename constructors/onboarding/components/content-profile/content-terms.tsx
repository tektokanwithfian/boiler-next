import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { schema } from './actions/schema'
import type { UseFormReturn } from 'react-hook-form'

import type { z } from 'zod'

function Component(
  { form }:
  { form: UseFormReturn<z.infer<typeof schema>> },
) {
  return (
    <FormField
      control={form.control}
      name="terms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <div className="flex items-start space-x-2 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="relative top-[2px]"
              />
            </FormControl>
            <div className="leading-none">
              <FormLabel>
                Accept terms and conditions
              </FormLabel>
              <FormDescription>
                <Dialog>
                  <span>
                    By checking this box, you agree to our
                    {' '}
                  </span>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto">terms and conditions</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Terms and Conditions</DialogTitle>
                      <DialogDescription>
                        [Placeholder description]
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                .
              </FormDescription>
            </div>
          </div>
          <FormMessage className="ml-6" />
        </FormItem>
      )}
    />
  )
}

export default Component
