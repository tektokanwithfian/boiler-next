import { getById } from '@/services/interface/search/search'
import type { Profile } from '@/types/user'
import Content from './components/content'

async function Component(
  { params: { id } }:
  { params: { id: string } },
) {
  const { result: data, error } = await getById<Profile>({
    name: 'profile',
    id,
  })

  if (!data && error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    )
  }

  return <Content data={data!} />
}

export default Component
