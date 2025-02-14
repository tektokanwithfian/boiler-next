import {
  FormControl, FormDescription, FormField, FormItem, FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { goals } from '../actions/schema'
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
      name="goal"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {goals.map((goal) => (
                <FormItem
                  key={goal.code}
                  className="flex items-center space-x-3 space-y-0 border rounded-lg p-2"
                >
                  <FormControl>
                    <div className="px-2 border-r border-gray-300">
                      <RadioGroupItem value={goal.code} />
                    </div>
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel className="font-normal">
                      {goal.label}
                    </FormLabel>
                    <FormDescription className="text-xs">
                      {goal.description}
                    </FormDescription>
                  </div>
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
