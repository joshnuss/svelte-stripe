<script>
  import { setContext } from 'svelte'
  import { isServer, register } from './util'

  /** @typedef { import('@stripe/stripe-js').Stripe } Appearance */
  /** @typedef { import('@stripe/stripe-js').Appearance } Appearance */
  /** @typedef { import('@stripe/stripe-js').StripeElementsOptions } StripeElementsOptions */

  /**
   * @typedef {Object} Props
   * @property {Stripe?} stripe
   * @property {StripeElementsOptions["mode"]} [mode]
   * @property {Appearance["theme"]} [theme]
   * @property {Appearance["variables"]} [variables]
   * @property {Appearance["rules"]} [rules]
   * @property {Appearance["labels"]} [labels]
   * @property {StripeElementsOptions["loader"]} [loader]
   * @property {StripeElementsOptions["fonts"]} [fonts]
   * @property {StripeElementsOptions["locale"]} [locale]
   * @property {StripeElementsOptions["currency"]} [currency]
   * @property {StripeElementsOptions["amount"]} [amount]
   * @property {string?} [clientSecret]
   * @property {import('@stripe/stripe-js').StripeElements?} [elements]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let {
    stripe,
    mode = undefined,
    theme = 'stripe',
    variables = {},
    rules = {},
    labels = 'above',
    loader = 'auto',
    fonts = [],
    locale = "auto",
    currency = undefined,
    amount = undefined,
    clientSecret = undefined,
    elements = $bindable(),
    children
  } = $props();


  let appearance = $derived({
    theme, variables, rules, labels
  })

  $effect(() => {
    if (stripe && !elements) {
      elements = stripe.elements({ mode, currency, amount, appearance, clientSecret, fonts, loader, locale })

      register(stripe)
      setContext('stripe', { stripe, elements })
    }
  })

  $effect(() => {
    if (elements) {
      elements.update({ appearance, locale })
    }
  })
</script>

{#if stripe && elements}
  {@render children?.()}
{/if}
