<script>
  import { mount } from './util'
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  /** @type {import('@stripe/stripe-js').StripePaymentMethodMessagingElementOptions["amount"]} */
  export let amount

  /** @type {import('@stripe/stripe-js').StripePaymentMethodMessagingElementOptions["currency"]} */
  export let currency

  /** @type {import('@stripe/stripe-js').StripePaymentMethodMessagingElementOptions["paymentMethodTypes"]} */
  export let paymentMethodTypes

  /** @type {import('@stripe/stripe-js').StripePaymentMethodMessagingElementOptions["countryCode"]} */
  export let countryCode

  /** @type {import('@stripe/stripe-js').StripePaymentMethodMessagingElementOptions["logoColor"]?} */
  export let logoColor = null

  /** @type {import('@stripe/stripe-js').StripePaymentMethodMessagingElementOptions["metadata"]?} */
  export let metadata = null

  /** @type {import('@stripe/stripe-js').StripeElementBase?} */
  export let element = null

  /** @type {HTMLElement?} */
  let wrapper

  const dispatch = createEventDispatcher()

  /** @type {import("./types").ElementsContext} */
  const { elements } = getContext('stripe')

  onMount(() => {
    const options = { amount, currency, paymentMethodTypes, countryCode, logoColor, metadata }

    element = mount(wrapper, 'paymentMethodMessaging', elements, dispatch, options)

    return () => element.destroy()
  })
</script>

<div bind:this={wrapper} />
