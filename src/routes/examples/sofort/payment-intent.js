import Stripe from 'stripe'

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])

export async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'EUR',
    payment_method_types: ['sofort']
  })

  return {
    body: {
      clientSecret: paymentIntent.client_secret
    }
  }
}
