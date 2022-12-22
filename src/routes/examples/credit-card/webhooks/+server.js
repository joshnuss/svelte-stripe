import Stripe from 'stripe'
import { SECRET_STRIPE_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export async function POST(request) {
  const rawBody = Buffer.from(request.rawBody)
  const signature = request.headers['stripe-signature']
  
  let event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.warn('⚠️  Webhook signature verification failed.', err.message)

    return new Response(undefined, { status: 400 })
  }

  if (event.type == 'charge.succeeded') {
    const charge = event.data.object

    // TODO: fulfill the order
    console.log(`✅ Charge succeeded ${charge.id}`)
  }

  return new Response(undefined)
}
