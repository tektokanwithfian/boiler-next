import database from '@/services/adapter/firestore/firestore-document'

export async function create(
  { collection, document }:
  { collection: string, document: Record<string, any>, },
): Promise<{
    result: { id: string } | null
    error: Error | null
  }> {
  const { result, error } = await database
    .create({ collection, document })

  if (!result && error) {
    return { result: null, error }
  }

  return { result, error: null }
}

export async function remove(
  { collection, id }:
  { collection: string, id: string, },
): Promise<{
    result: { ok: boolean } | null
    error: Error | null
  }> {
  const { result, error } = await database
    .remove({ collection, id })

  if (!result && error) {
    return { result: null, error }
  }

  return { result, error: null }
}

export async function update(
  { collection, id, document }:
  { collection: string, id: string, document: Record<string, any>, },
): Promise<{
    result: { ok: boolean } | null
    error: Error | null
  }> {
  const { result, error } = await database
    .update({ collection, id, document })

  if (!result && error) {
    return { result: null, error }
  }

  return { result, error: null }
}

const db = {
  create,
  remove,
  update,
}

export default db
