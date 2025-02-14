import { cn } from '@/services/utils'

function Component({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'border-gray-300 mr-2 h-5 w-5 animate-spin rounded-full border-4 border-t-primary',
        className,
      )}
    />
  )
}

export default Component
