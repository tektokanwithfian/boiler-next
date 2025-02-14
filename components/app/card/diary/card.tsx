import {
  Card,
} from '@/components/ui/card'
import type { Diary } from '@/types/diary'

import CardHeader from './card-header'

interface Props {
  item: Diary
}

function Component({ item }: Props) {
  return (
    <Card className="flex flex-col shadow-none p-0 gap-4">
      <CardHeader item={item} />
    </Card>
  )
}

export default Component
