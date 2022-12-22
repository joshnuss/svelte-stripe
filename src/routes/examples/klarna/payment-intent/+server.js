import { json } from '@sveltejs/kit';
import Stripe from 'stripe'

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])

export async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'USD',
    payment_method_types: ['klarna']
  })

  return json({
  clientSecret: paymentIntent.client_secret
})
}
