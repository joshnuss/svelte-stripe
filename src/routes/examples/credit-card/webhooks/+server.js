import Stripe from 'stripe'

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])
const endpointSecret = process.env['STRIPE_WEBHOOK_SECRET']

export async function POST(request) {
  const rawBody = Buffer.from(request.rawBody)
  const signature = request.headers['stripe-signature']
  
  let event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret)
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
