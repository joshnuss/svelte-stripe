import { json } from '@sveltejs/kit';
import Stripe from 'stripe'

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY_JP'])

export async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'jpy',
    payment_method_types: ['konbini'],
    payment_method_options: {
      konbini: {
        product_description: 'Tシャツ',
        expires_after_days: 3
      },
    }
  })

  return json({
  clientSecret: paymentIntent.client_secret
})
}
