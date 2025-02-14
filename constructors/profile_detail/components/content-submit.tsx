import Spinner from '@/components/app/spinner'
import { Button } from '@/components/ui/button'
import type { HookActionStatus } from 'next-safe-action/hooks'

interface Props {
  status: HookActionStatus
}

function Component({ status }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 p-2 md:p-4 md:grid-cols-3">
      <div />
      <div className="col-span-full md:col-span-2">
        <Button
          className="font-semibold"
          type="submit"
          size="lg"
          disabled={status === 'executing'}
        >
          {(status === 'executing') && (<Spinner />)}
          Update profile
        </Button>
      </div>
    </div>
  )
}

export default Component
