import type { Stripe } from '@stripe/stripe-js'

export const isServer: boolean = typeof window === 'undefined'

export function register(stripe: Stripe) {
  if (!isServer) {
    return stripe.registerAppInfo({
      name: 'svelte-stripe-js',
      url: 'https://svelte-stripe-js.vercel.app'
    })
  }
}
