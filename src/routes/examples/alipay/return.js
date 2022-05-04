import Stripe from 'stripe'

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])

export async function get(req) {
  const intentId = req.url.searchParams.get('payment_intent')
  const clientSecret = req.url.searchParams.get('payment_intent_client_secret')
  const paymentIntent = await stripe.paymentIntents.retrieve(intentId)

  if (paymentIntent.client_secret !== clientSecret)
    throw new Error('Client secret mismatch')

  if (paymentIntent.status === 'succeeded') {
    return {
      status: 302,
      headers: {
        location: '/examples/alipay/thanks'
      }
    }
  }

  return {
    status: 302,
    headers: {
      location: '/examples/alipay?error=true'
    }
  }
}
