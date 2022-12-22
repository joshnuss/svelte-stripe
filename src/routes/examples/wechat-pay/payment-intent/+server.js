import { json as json$1 } from '@sveltejs/kit';
import Stripe from 'stripe'

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])

export async function POST({ request }) {
  const { email } = await request.json()
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'cny',
    payment_method_types: ['wechat_pay'],
    payment_method_options: {
      wechat_pay: {
        client: 'web'
      }
    },
    receipt_email: email
  })

  return json$1({
  clientSecret: paymentIntent.client_secret
})
}
