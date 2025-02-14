import Image from 'next/image'

import Link from 'next/link'
import Spinner from '@/components/app/spinner'
import {
  CardHeader,
} from '@/components/ui/card'
import { useImage } from '@/services/hooks/use-image'
import type { Diary } from '@/types/diary'

interface Props {
  item: Diary
}

function Component({ item }: Props) {
  const { data, isLoading } = useImage({
    key: item.file?.key as string,
  })
  return (
    <CardHeader className="p-0">
      <Link href={`/diary/${item.id}`} className="group overflow-hidden rounded-xl">
        {isLoading && (
        <div className="aspect-[7/8] flex items-center justify-center">
          <Spinner className="size-20" />
        </div>
        )}
        {!isLoading && (
        <Image
          width={512}
          height={512}
          alt="Diary"
          src={data || '/placeholder.svg'}
          className="aspect-[7/8] w-full bg-gray-200 object-cover group-hover:opacity-75 group-hover:scale-125 transition-transform duration-100"
          priority
        />
        )}
      </Link>

    </CardHeader>
  )
}

export default Component
