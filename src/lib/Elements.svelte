<script>
  import { setContext } from 'svelte'
  import { isServer, register } from './util'

  /** @type {import('@stripe/stripe-js').Stripe?} */
  export let stripe

  /** @type {StripeElementsOptions["mode"]} */
  export let mode = undefined

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

  /** @type {StripeElementsOptions["fonts"]} */
  export let fonts = []

  /** @type {StripeElementsOptions["locale"]} */
  export let locale = "auto"

  /** @type {StripeElementsOptions["currency"]} */
  export let currency = undefined

  /** @type {StripeElementsOptions["amount"]} */
  export let amount = undefined

  /** @type {string?} */
  export let clientSecret = undefined

  $: appearance = {
    theme, variables, rules, labels
  }

  /** @type {import('@stripe/stripe-js').StripeElements?} */
  export let elements = null

  $: if (stripe && !elements) {
    elements = stripe.elements({ mode, currency, amount, appearance, clientSecret, fonts, loader, locale })

    register(stripe)
    setContext('stripe', { stripe, elements })
  }

  $: if (elements) {
    elements.update({ appearance, locale })
  }
</script>

{#if stripe && elements}
  <slot />
{/if}
