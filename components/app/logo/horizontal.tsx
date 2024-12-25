import { Command } from 'lucide-react'
import { Orbitron } from 'next/font/google'
import Link from 'next/link'
import { cn } from '@/services/utils'

const font = Orbitron({ subsets: ['latin'], weight: '700' })

function Component({
  text = 'sm',
}: {
  text?: string
}) {
  return (
    <Link href="/" className="flex items-center gap-2 py-6">
      <div
        className={cn('flex flex-1 items-center text-left text-sm leading-tight', `text-${text}`, font.className)}
      >
        <span className="truncate text-6xl font-semibold">Acme</span>
        <Command className="size-24 stroke-2 text-primary" />
        <span className="truncate text-6xl font-semibold">inc</span>
      </div>
    </Link>
  )
}

export default Component
