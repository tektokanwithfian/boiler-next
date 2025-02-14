import Allergies from './content-allergies'
import FamilyHistory from './content-family-health-history'
import HealthCondition from './content-health-condition'
import Medications from './content-medications'
import PhysicalActivityLevel from './content-physical-activity-level'

import type { schema } from '../actions/schema'

import type { UseFormReturn } from 'react-hook-form'
import type { z } from 'zod'

function Component(
  { form }:
  { form: UseFormReturn<z.infer<typeof schema>> },
) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-4 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold leading-7">Extended Information (Optional)</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Extended information regarding your profile,
          with more details about your health and lifestyle.
          <br />
          <br />
          All fields are optional.
          <br />
          <span className="font-semibold">Please fill in any relevant information you wish to share.</span>
        </p>
      </div>

      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <HealthCondition form={form} />
          </div>
          <div className="col-span-full">
            <Medications form={form} />
          </div>
          <div className="col-span-full">
            <Allergies form={form} />
          </div>
          <div className="col-span-full">
            <PhysicalActivityLevel form={form} />
          </div>
          <div className="col-span-full">
            <FamilyHistory form={form} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Component
