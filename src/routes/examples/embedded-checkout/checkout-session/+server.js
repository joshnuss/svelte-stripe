import { json } from '@sveltejs/kit'
import Stripe from 'stripe'
import { SECRET_STRIPE_KEY, DOMAIN } from '$env/static/private'

const stripe = new Stripe(SECRET_STRIPE_KEY)
const return_url = new URL('/examples/embedded-checkout/thanks?session_id={CHECKOUT_SESSION_ID}', DOMAIN).toString()

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        price: 'price_1ODEgRHfKEQGgXe5p6BvaWV2',
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url
  })

  return json({
    clientSecret: session.client_secret
  })
}
