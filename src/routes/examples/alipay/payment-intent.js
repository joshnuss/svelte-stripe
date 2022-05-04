import Stripe from 'stripe'

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])

export async function post({ request }) {
  const { email } = await request.json()
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'cny',
    payment_method_types: ['alipay'],
    receipt_email: email
  })

  return {
    body: {
      clientSecret: paymentIntent.client_secret
    }
  }
}
