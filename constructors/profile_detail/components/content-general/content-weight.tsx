import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { schema } from '../actions/schema'
import type { UseFormReturn } from 'react-hook-form'

import type { z } from 'zod'

function Component(
  { form }:
  { form: UseFormReturn<z.infer<typeof schema>> },
) {
  return (
    <FormField
      control={form.control}
      name="weight"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Weight (kg)</FormLabel>
          <FormControl>
            <Input placeholder="70" {...field} type="number" step="0.01" />
          </FormControl>
          <FormDescription>
            Enter your weight in kilograms.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default Component
