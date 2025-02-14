import { format } from 'date-fns-tz'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { getLifeStage } from '@/services/utils'
import { type schema } from './actions/schema'
import type { UseFormReturn } from 'react-hook-form'

import type { z } from 'zod'

function Component(
  { form }:
  { form: UseFormReturn<z.infer<typeof schema>> },
) {
  return (
    <FormField
      control={form.control}
      name="dob"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date of birth</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type="date"
                {...field}
                value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                min="1900-01-01"
                className="w-full [&::-webkit-calendar-picker-indicator]:my-[10px] [&::-webkit-calendar-picker-indicator]:p-0 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer pr-2 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:top-2 top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2"
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null
                  field.onChange(date)
                  if (date) {
                    form.setValue('lifeStage', getLifeStage(date))
                  }
                }}
              />
            </div>
          </FormControl>
          <FormDescription>
            Your date of birth is used to calculate your age.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default Component
