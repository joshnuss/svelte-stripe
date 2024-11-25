<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  /**
   * @typedef {object} Props
   * @property {import('@stripe/stripe-js').StripeElementClasses} [classes]
   * @property {import('@stripe/stripe-js').StripePaymentRequestButtonElementOptions["style"]["paymentRequestButton"]} [style]
   * @property {import('@stripe/stripe-js').PaymentRequestOptions} paymentRequest
   * @property {import('@stripe/stripe-js').StripeElementBase?} [element]
   * @property {boolean?} [canMakePayment]
   */

  /** @type {Props} */
  let {
    classes = {},
    style = {},
    paymentRequest,
    element = $bindable(),
    canMakePayment = $bindable()
  } = $props();

  /** @type {HTMLElement?} */
  let wrapper = $state()

  /** @type {import('@stripe/stripe-js').PaymentRequest} */
  let paymentRequestObject

  const dispatch = createEventDispatcher()

  /** @type {import("./types").ElementsContext} */
  const { stripe, elements } = getContext('stripe')

  onMount(async () => {
    paymentRequestObject = stripe.paymentRequest(paymentRequest)
    const options = {
      classes,
      style: { paymentRequestButton: style },
      paymentRequest: paymentRequestObject
    }
    element = elements.create('paymentRequestButton', options)
    const result = await paymentRequestObject.canMakePayment()

    paymentRequestObject.on('token', (e) => dispatch('token', e))
    paymentRequestObject.on('cancel', (e) => dispatch('cancel', e))
    paymentRequestObject.on('paymentmethod', (e) => dispatch('paymentmethod', e))
    paymentRequestObject.on('shippingaddresschange', (e) => dispatch('shippingaddresschange', e))
    paymentRequestObject.on('shippingoptionchange', (e) => dispatch('shippingoptionchange', e))

    if (result) {
      canMakePayment = true
      element.mount(wrapper)
    } else {
      canMakePayment = false
      wrapper.style.display = 'none'
    }

    return () => element.destroy()
  })
</script>

<div bind:this={wrapper}></div>
