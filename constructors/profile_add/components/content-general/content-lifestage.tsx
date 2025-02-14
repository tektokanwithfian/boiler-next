import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { lifeStages } from '@/services/utils'

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
      name="lifeStage"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Life Stage</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select life stage" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {lifeStages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Your life stage is automatically determined by your date of birth.
            {' '}
            You can manually adjust if needed.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

  )
}

export default Component
