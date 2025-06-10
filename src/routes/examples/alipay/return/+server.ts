import { redirect, error } from '@sveltejs/kit'
import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export async function GET(req) {
  const { searchParams } = req.url
  const intentId = searchParams.get('payment_intent')
  const clientSecret = searchParams.get('payment_intent_client_secret')

  if (!intentId || !clientSecret) return error(404)

  const paymentIntent = await stripe.paymentIntents.retrieve(intentId)

  if (paymentIntent.client_secret !== clientSecret) throw new Error('Client secret mismatch')

  if (paymentIntent.status === 'succeeded') {
    redirect(302, '/examples/alipay/thanks')
  }

  redirect(302, '/examples/alipay?error=true')
}
