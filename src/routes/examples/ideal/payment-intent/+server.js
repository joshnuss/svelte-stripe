import { json as json$1 } from '@sveltejs/kit';
import Stripe from 'stripe'

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])

export async function POST({ request }) {
  const body = await request.json()
  const paymentIntent = await stripe.paymentIntents.create({
    amount: body.amount,
    currency: 'eur',
    payment_method_types: ['ideal']
  })

  return json$1({
  clientSecret: paymentIntent.client_secret
})
}
