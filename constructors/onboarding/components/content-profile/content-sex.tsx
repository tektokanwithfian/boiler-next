import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { schema } from './actions/schema'
import type { UseFormReturn } from 'react-hook-form'

import type { z } from 'zod'

const sexes = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

function Component(
  { form }:
  { form: UseFormReturn<z.infer<typeof schema>> },
) {
  return (
    <FormField
      control={form.control}
      name="sex"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Sex</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col space-y-1"
            >
              {sexes.map(({ value, label }) => (
                <FormItem key={value} className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default Component
