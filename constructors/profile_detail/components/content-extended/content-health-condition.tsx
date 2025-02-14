import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { MAX_LENGTH, type schema } from '../actions/schema'

import type { UseFormReturn } from 'react-hook-form'

import type { z } from 'zod'

function Component(
  { form }:
  { form: UseFormReturn<z.infer<typeof schema>> },
) {
  return (
    <FormField
      control={form.control}
      name="healthCondition"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Current Health Conditions</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Please describe any current health conditions..."
              className="min-h-[50px]"
              {...field}
            />
          </FormControl>
          <FormDescription className="flex justify-end">
            {field.value?.length || 0}
            /
            {MAX_LENGTH}
            {' '}
            characters
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

  )
}

export default Component
