<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  /** @type {import('@stripe/stripe-js').StripeElementClasses} */
  export let classes = {}

  /** @type {import('@stripe/stripe-js').StripePaymentRequestButtonElementOptions["style"]["paymentRequestButton"]} */
  export let style = {}

  /** @type {import('@stripe/stripe-js').PaymentRequestOptions} */
  export let paymentRequest

  /** @type {import('@stripe/stripe-js').StripeElementBase?} */
  export let element = null

  /** @type {boolean?}*/
  export let canMakePayment = null

  /** @type {HTMLElement?} */
  let wrapper

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

    if (result) {
      canMakePayment = true
      element.mount(wrapper)
      paymentRequestObject.on('paymentmethod', (e) => {
        dispatch('paymentmethod', e)
      })
    } else {
      canMakePayment = false
      wrapper.style.display = 'none'
    }

    return () => element.destroy()
  })
</script>

<div bind:this={wrapper} />
