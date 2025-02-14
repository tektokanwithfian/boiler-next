import auth from '@/services/interface/auth/auth'
import db from '@/services/interface/db/db'
import type { Profile } from '@/types/user'

const NAME = 'profile'

export async function create({ doc }: { doc: Profile }) {
  const { result: user } = await auth.user()
  if (!user) {
    return { result: null, error: new Error('User not found') }
  }
  doc.user = user.id

  const now = Date.now()

  doc.createdAt = now
  doc.updatedAt = now

  const { result, error } = await db.create({ collection: NAME, document: doc })

  if (!result && error) {
    return { result: null, error }
  }

  doc.id = result?.id

  return { result: doc, error: null }
}

export async function remove({ id }: { id: string }) {
  const { result, error } = await db.remove({ collection: NAME, id })

  if (!result && error) {
    return { result: null, error }
  }

  return { result, error: null }
}

export async function update({ id, doc }: { id: string, doc: Profile }) {
  const now = Date.now()

  doc.updatedAt = now

  const { result, error } = await db.update({ id, collection: NAME, document: doc })

  if (!result && error) {
    return { result: null, error }
  }

  return { result: doc, error: null }
}

const actions = {
  create,
  remove,
  update,
}

export default actions
