import actions from '@/services/interface/document/user/actions'
import type { User } from '@/types/user'

interface WebhookDataEmail {
  email_address: string
}

interface WebhookData {
  email_addresses: WebhookDataEmail[]
  first_name: string
  id: string
  image_url: string
  last_name: string
  profile_image_url: string
}

interface Webhook {
  data: WebhookData
  object: string
  type: string
}

export async function POST(req: Request) {
  const secret = await req.headers.get('x-clerk-secret-webhook')
  if (!secret) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (secret !== process.env.CLERK_SECRET_WEBHOOK) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data }: Webhook = await req.json()

  const doc: User = {
    email: data.email_addresses[0].email_address,
    name: `${data.first_name} ${data.last_name}`,
    profilePic: data.profile_image_url || data.image_url,
    provider: data.id,
  }

  const { result, error } = await actions.create({ doc })
  if (!result && error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(result)
}
