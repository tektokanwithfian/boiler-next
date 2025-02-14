'use client'

import Active from './content-active'
import Avatar from './content-avatar'
import Dob from './content-dob'
import Height from './content-height'
import Lifestage from './content-lifestage'
import Name from './content-name'
import Sex from './content-sex'
import Weight from './content-weight'
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
        <h2 className="text-base font-semibold leading-7">General information</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          General information about your profile, such as your name, age, and gender.
        </p>
      </div>
      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <Avatar form={form} />
          </div>
          <div className="col-span-full">
            <Name form={form} />
          </div>
          <div className="col-span-full">
            <Dob form={form} />
          </div>
          <div className="col-span-full">
            <Lifestage form={form} />
          </div>
          <div className="col-span-3">
            <Height form={form} />
          </div>
          <div className="col-span-3">
            <Weight form={form} />
          </div>
          <div className="col-span-full">
            <Sex form={form} />
          </div>
          <div className="col-span-full">
            <Active form={form} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Component
