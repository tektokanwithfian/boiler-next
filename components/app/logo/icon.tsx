import { cn } from '@/services/utils'
import Mark from './mark'

function Component({
  size = 12,
}: {
  size?: number
}) {
  return (
    <div
      className={cn(
        'flex aspect-square items-center justify-center rounded-lg bg-primary text-primary-foreground',
        `size-${size}`,
      )}
    >
      <Mark className={cn('size-6 fill-white', `size-${size / 2}`)} />
    </div>
  )
}

export default Component
