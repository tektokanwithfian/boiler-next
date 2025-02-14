import { format } from 'date-fns-tz'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import {
  CardHeader,
} from '@/components/ui/card'
import { getAgeUnix } from '@/services/utils'
import type { Profile } from '@/types/user'

interface Props {
  item: Profile
}

function Component({ item }: Props) {
  return (
    <CardHeader className="p-0">
      <div className="flex items-center gap-x-4 rounded-lg bg-gray-100 p-4">
        <Image
          width={64}
          height={64}
          src="/placeholder.svg"
          alt={item.name || 'Profile'}
          className="h-12 w-12 rounded-lg bg-gray-300 object-cover"
        />

        <div className="flex justify-between items-center flex-1">
          <div className="flex flex-col">
            <p>
              {item.name}
            </p>
            <p className="text-xs text-secondary-foreground">
              {format(new Date(Number(item.dob)), 'dd MMMM yyyy', {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              })}
              {` (${getAgeUnix(Number(item.dob))} yo)`}
            </p>
          </div>
          {item.active && (
            <Badge
              variant="outline"
              className="mt-2 text-primary border-primary rounded-xl"
            >
              Active Profile
            </Badge>
          )}
        </div>
      </div>
    </CardHeader>
  )
}

export default Component
