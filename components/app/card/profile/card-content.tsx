import {
  CardContent,
} from '@/components/ui/card'
import type { Profile } from '@/types/user'

interface Props {
  item: Profile
}

function Component({ item }: Props) {
  return (
    <CardContent className="p-0">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Height', value: item.height },
          { label: 'Weight', value: item.weight },
          { label: 'Sex', value: item.sex },
        ].map((stat) => (
          <div key={stat.label} className="group relative">
            <div className="relative p-4 rounded-xl backdrop-blur-sm border border-gray-900/20">
              <p className="text-xs text-center mb-1">{stat.label}</p>
              <p className="font-bold text-center">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  )
}

export default Component
