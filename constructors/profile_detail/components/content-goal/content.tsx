import Options from './content-options'
import type { schema } from '../actions/schema'
import type { UseFormReturn } from 'react-hook-form'

import type { z } from 'zod'

function Component(
  { form }:
  { form: UseFormReturn<z.infer<typeof schema>> },
) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 p-4 md:p-8 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7">
          Primary Dietary Goal
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Select the main reason you&apos;re interested in managing your diet.
          {' '}
          This helps us provide more relevant guidance.
        </p>
      </div>

      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <Options form={form} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Component
