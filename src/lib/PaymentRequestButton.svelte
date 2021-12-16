<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  export let classes = {}
  export let style = {}
  export let paymentRequest = {}
  export let element = null

  let wrapper
  let paymentRequestObject
  export let canMakePayment = null

  const dispatch = createEventDispatcher()
  const { stripe, elements } = getContext('stripe')

  onMount(async () => {
    paymentRequestObject = stripe.paymentRequest(paymentRequest)
    const options = { classes, style, paymentRequest: paymentRequestObject }
    element = elements.create('paymentRequestButton', options)

    const result = await paymentRequestObject.canMakePayment()

    if (result) {
      canMakePayment = true
      element.mount(wrapper)
      paymentRequestObject.on('paymentmethod', e => {
        dispatch('paymentmethod', e)
      })
    } else {
      canMakePayment = false
      wrapper.style.display = 'none'
    }

    return () => element.unmount()
  })
</script>

<div bind:this={wrapper} />
