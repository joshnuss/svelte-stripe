import { json as json$1 } from '@sveltejs/kit'
import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export async function POST({ request }) {
  const body = await request.json()
  const paymentIntent = await stripe.paymentIntents.create({
    amount: body.amount,
    currency: 'eur',
    payment_method_types: ['sepa_debit']
  })

  return json$1({
  clientSecret: paymentIntent.client_secret
})
}
