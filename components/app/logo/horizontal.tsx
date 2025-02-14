import { Odibee_Sans } from 'next/font/google'
import Link from 'next/link'
import { cn } from '@/services/utils'

import Mark from './mark'

const font = Odibee_Sans({ subsets: ['latin'], weight: '400' })

function Component({
  className,
  text = 'sm',
}: {
  text?: string
  className?: string
}) {
  return (
    <Link href="/" className={cn('gap-2 py-6', className)}>
      <div
        className={cn('flex flex-1 items-center text-center text-sm leading-tight', `text-${text}`, font.className)}
      >
        <span className="relative left-5 truncate text-8xl font-semibold">Diet</span>
        <Mark className="relative bottom-2 size-20 stroke-2 text-primary" />
        <span className="relative right-6 truncate text-8xl font-semibold">n</span>
      </div>
    </Link>
  )
}

export default Component
