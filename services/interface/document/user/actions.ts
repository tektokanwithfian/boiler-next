import db from '@/services/interface/db/db'
import { get } from '@/services/interface/search/search'
import type { User } from '@/types/user'

const NAME = 'user'

export async function create({ doc }: { doc: User }) {
  const now = Date.now()

  doc.createdAt = now
  doc.updatedAt = now

  doc.application = process.env.APP_NAME

  const { result: existing } = await get<User>({
    name: NAME,
    paging: {
      limit: 1,
      page: 1,
    },
    query: {
      keyword: doc.email,
      field: 'email',
      filter: `application:${doc.application}`,
    },
  })

  if (existing && existing.items && existing.items.length > 0) {
    const [user] = existing.items

    doc.id = user?.id
  } else {
    const { result, error } = await db.create({ collection: NAME, document: doc })

    if (!result && error) {
      return { result: null, error }
    }

    doc.id = result?.id
  }

  return { result: doc, error: null }
}

const actions = {
  create,
}

export default actions
