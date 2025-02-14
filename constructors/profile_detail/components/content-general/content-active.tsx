import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
      name="active"
      render={({ field }) => (
        <FormItem>
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
                Activate profile
              </FormLabel>
              <FormDescription>
                {`By checking this box, 
                you will make this newly created profile as your main active profile.
                Which will automatically deactivate your previous active profile. `}
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
