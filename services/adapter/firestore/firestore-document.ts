import { firestore } from '@/services/adapter/firestore/firestore-client'
import typesense from '@/services/adapter/typesense/typesense-document'

const converter = {
  toFirestore: (data: Record<string, any>) => data,
  fromFirestore: (
    snap: FirebaseFirestore.QueryDocumentSnapshot,
  ) => snap.data() as Record<string, any>,
}

export async function create(
  { collection, document }:
  { collection: string, document: Record<string, any>, },
): Promise<{
    result: { id: string } | null
    error: Error | null
  }> {
  try {
    const { id } = await firestore
      .collection(collection)
      .withConverter(converter)
      .add(document)
      .then(async (ref) => {
        const { error } = await typesense
          .create({
            name: collection,
            document: { id: ref.id, ...document },
          })
        if (error) {
          throw error
        }
        return { id: ref.id }
      })
      .catch((error) => {
        throw error
      })

    return { result: { id }, error: null }
  } catch (error) {
    return { result: null, error: error as Error }
  }
}

export async function remove(
  { collection, id }:
  { collection: string, id: string, },
): Promise<{
    result: { ok: boolean } | null
    error: Error | null
  }> {
  try {
    const { ok } = await firestore
      .collection(collection)
      .doc(id)
      .delete()
      .then(async () => {
        const { error } = await typesense
          .remove({ id, name: collection })
        if (error) {
          throw error
        }
        return { ok: true }
      })
      .catch((error) => {
        throw error
      })
    return { result: { ok }, error: null }
  } catch (error) {
    return { result: null, error: error as Error }
  }
}

export async function update(
  { collection, id, document }:
  { collection: string, id: string, document: Record<string, any>, },
): Promise<{
    result: { ok: boolean } | null
    error: Error | null
  }> {
  try {
    const { ok } = await firestore
      .collection(collection)
      .doc(id)
      .update(document)
      .then(async () => {
        const { error } = await typesense
          .update({ document, id, name: collection })
        if (error) {
          throw error
        }
        return { ok: true }
      })
      .catch((error) => {
        throw error
      })
    return { result: { ok }, error: null }
  } catch (error) {
    return { result: null, error: error as Error }
  }
}

const document = {
  create,
  remove,
  update,
}

export default document
