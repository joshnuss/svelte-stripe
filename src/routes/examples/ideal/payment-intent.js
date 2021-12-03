import Stripe from 'stripe'

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])

export async function post({ body }) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: body.amount,
    currency: 'eur',
    payment_method_types: ['ideal']
  })

  return {
    body: {
      clientSecret: paymentIntent.client_secret
    }
  }
}
