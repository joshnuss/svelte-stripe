import Stripe from 'stripe'

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])

export async function GET(req) {
  const { searchParams } = req.url
  const intentId = searchParams.get('payment_intent')
  const clientSecret = searchParams.get('payment_intent_client_secret')
  const paymentIntent = await stripe.paymentIntents.retrieve(intentId)

  if (paymentIntent.client_secret !== clientSecret)
    throw new Error('Client secret mismatch')

  if (paymentIntent.status === 'processing') {
    return new Response(undefined, {
      status: 302,
      headers: {
        location: '/examples/sofort/thanks'
      }
    })
  }

  return new Response(undefined, {
    status: 302,
    headers: {
      location: '/examples/sofort?error=true'
    }
  })
}
