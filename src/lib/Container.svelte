<script>
  import { setContext } from 'svelte'
  import { isServer, register } from './util'

  /** @type {import('@stripe/stripe-js').Stripe?} */
  export let stripe

  /** @typedef { import('@stripe/stripe-js').Appearance } Appearance */

  /** @type {Appearance["theme"]} */
  export let theme = 'stripe'

  /** @type {Appearance["variables"]} */
  export let variables = {}

  /** @type {Appearance["rules"]} */
  export let rules = {}

  /** @type {Appearance["labels"]} */
  export let labels = 'above'

  /** @typedef { import('@stripe/stripe-js').StripeElementsOptions } StripeElementsOptions */

  /** @type {StripeElementsOptions["loader"]} */
  export let loader = 'auto'

  /** @type {string?} */
  export let clientSecret = undefined

  /** @type {import('@stripe/stripe-js').StripeElements?} */
  export let elements = isServer
    ? null
    : stripe.elements({ appearance: { theme, variables, rules, labels }, clientSecret, loader })

  register(stripe)
  setContext('stripe', { stripe, elements })

  console.warn('svelte-stripe: <Container/> is deprecated, please use <Elements/> instead.')
</script>

<slot />
