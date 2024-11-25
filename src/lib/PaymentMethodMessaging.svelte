<script>
  import { mount } from './util'
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  /**
   * @typedef {object} Props
   * @property {import('@stripe/stripe-js').StripePaymentMethodMessagingElementOptions["amount"]} amount
   * @property {import('@stripe/stripe-js').StripePaymentMethodMessagingElementOptions["currency"]} currency
   * @property {import('@stripe/stripe-js').StripePaymentMethodMessagingElementOptions["paymentMethodTypes"]} paymentMethodTypes
   * @property {import('@stripe/stripe-js').StripePaymentMethodMessagingElementOptions["countryCode"]} countryCode
   * @property {import('@stripe/stripe-js').StripePaymentMethodMessagingElementOptions["logoColor"]?} [logoColor]
   * @property {import('@stripe/stripe-js').StripePaymentMethodMessagingElementOptions["metadata"]?} [metadata]
   * @property {import('@stripe/stripe-js').StripeElementBase?} [element]
   */

  /** @type {Props} */
  let {
    amount,
    currency,
    paymentMethodTypes,
    countryCode,
    logoColor = null,
    metadata = null,
    element = $bindable()
  } = $props();

  /** @type {HTMLElement?} */
  let wrapper = $state()

  const dispatch = createEventDispatcher()

  /** @type {import("./types").ElementsContext} */
  const { elements } = getContext('stripe')

  onMount(() => {
    const options = { amount, currency, paymentMethodTypes, countryCode, logoColor, metadata }

    element = mount(wrapper, 'paymentMethodMessaging', elements, dispatch, options)

    return () => element.destroy()
  })
</script>

<div bind:this={wrapper}></div>
