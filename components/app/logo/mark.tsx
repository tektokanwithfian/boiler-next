import { Command } from 'lucide-react'
import { cn } from '@/services/utils'

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
      <Command className={cn('size-6', `size-${size / 2}`)} />
    </div>
  )
}

export default Component
