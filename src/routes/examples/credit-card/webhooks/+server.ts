import Stripe from 'stripe'
import { SECRET_STRIPE_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private'
import { error } from '@sveltejs/kit'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export async function POST({ request }) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) return error(401)

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.warn('⚠️  Webhook signature verification failed.')

    return new Response(undefined, { status: 400 })
  }

  if (event.type == 'charge.succeeded') {
    const charge = event.data.object

    // TODO: fulfill the order
    console.log(`✅ Charge succeeded ${charge.id}`)
  }

  return new Response(undefined)
}
