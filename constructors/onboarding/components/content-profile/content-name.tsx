import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Profile Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter profile name" {...field} />
          </FormControl>
          <FormDescription>
            This is how your profile will be displayed.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default Component
