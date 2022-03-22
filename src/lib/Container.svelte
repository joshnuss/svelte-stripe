<script>
  import { setContext } from 'svelte'
  import { isServer, register } from './util'

  /** @type {import('@stripe/stripe-js').Stripe?} */
  export let stripe

  /** @type {import('@stripe/stripe-js').StripeElements?} */
  const elements = isServer ? null : stripe.elements()

  register(stripe)
  setContext('stripe', { stripe, elements })
</script>

<slot />
