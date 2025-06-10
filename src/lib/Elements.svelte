<script>
  import { setContext } from 'svelte'
  import { isServer, register } from './util'

  /** @type {import('@stripe/stripe-js').Stripe?} */
  export let stripe

  /** @type {import('@stripe/stripe-js').StripeElementsOptionsMode["mode"]} */
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

  /** @typedef { import('@stripe/stripe-js').StripeElementsOptionsClientSecret & import('@stripe/stripe-js').StripeElementsOptionsMode  } StripeElementsOptions */

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

  /** @type {StripeElementsOptions["paymentMethodTypes"]} */
  export let paymentMethodTypes = undefined

  /** @type {StripeElementsOptions["setupFutureUsage"]} */
  export let setupFutureUsage = undefined

  /** @type {StripeElementsOptions["captureMethod"]} */
  export let captureMethod = undefined

  /** @type {StripeElementsOptions["customerOptions"]} */
  export let customerOptions = undefined

  /** @type {StripeElementsOptions["externalPaymentMethodTypes"]} */
  export let externalPaymentMethodTypes = undefined

  /** @type {StripeElementsOptions["paymentMethodConfiguration"]} */
  export let paymentMethodConfiguration = undefined

  /** @type {StripeElementsOptions["paymentMethodCreation"]} */
  export let paymentMethodCreation = undefined

  /** @type {StripeElementsOptions["paymentMethodOptions"]} */
  export let paymentMethodOptions = undefined

  $: appearance = {
    theme, variables, rules, labels
  }

  /** @type {import('@stripe/stripe-js').StripeElements?} */
  export let elements = null

  $: if (stripe && !elements) {
    elements = stripe.elements({ mode, currency, amount, appearance, clientSecret, fonts, loader, locale, paymentMethodTypes, setupFutureUsage, captureMethod, customerOptions, externalPaymentMethodTypes, paymentMethodConfiguration, paymentMethodCreation, paymentMethodOptions })

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
