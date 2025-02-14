import storage from '@/services/interface/storage/storage'

export async function POST(req: Request) {
  const { key } = await req.json()

  const { result: url, error } = await storage.read({ key })
  if (!url && error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ url })
}

export async function PUT(req: Request) {
  const { key, type } = await req.json()

  const { result: url, error } = await storage.write({ key, type })
  if (!url && error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ url })
}
