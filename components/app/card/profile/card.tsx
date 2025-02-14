import {
  Card,
} from '@/components/ui/card'
import type { Profile } from '@/types/user'

import CardContent from './card-content'
import CardFooter from './card-footer'
import CardHeader from './card-header'

interface Props {
  item: Profile
}

function Component({ item }: Props) {
  return (
    <Card className="flex flex-col shadow-none p-4 gap-4">
      <CardHeader item={item} />
      <CardContent item={item} />
      <CardFooter item={item} />
    </Card>
  )
}

export default Component
