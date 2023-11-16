<script>
  import { mount } from './util'
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  /** @typedef { import('@stripe/stripe-js').StripeExpressCheckoutElementOptions } Options */

  /** @type {Options['buttonHeight']} */
  export let buttonHeight = undefined

  /** @type {Options['buttonTheme']} */
  export let buttonTheme = undefined

  /** @type {Options['buttonType']} */
  export let buttonType = undefined

  /** @type {Options['layout']} */
  export let layout = undefined

  /** @type {Options['paymentMethodOrder']} */
  export let paymentMethodOrder = undefined

  /** @type {Options['wallets']} */
  export let wallets = undefined

  /** @type {import('@stripe/stripe-js').StripeElementBase?} */
  export let element = null

  /** @type {HTMLElement?} */
  let wrapper

  const dispatch = createEventDispatcher()

  /** @type {import("./types").ElementsContext} */
  const { elements } = getContext('stripe')

  onMount(() => {
    const options = {
      buttonHeight,
      buttonTheme,
      buttonType,
      layout,
      paymentMethodOrder,
      wallets
    }

    element = mount(wrapper, 'expressCheckout', elements, dispatch, options)
    element.on('click', (e) => dispatch('click', e))
    element.on('cancel', (e) => dispatch('cancel', e))
    element.on('confirm', (e) => dispatch('confirm', e))
    element.on('shippingaddresschange', (e) => dispatch('shippingaddresschange', e))
    element.on('shippingratechange', (e) => dispatch('shippingratechange', e))

    return () => element.destroy()
  })

  export function blur() {
    element.blur()
  }

  export function clear() {
    element.clear()
  }

  export function destroy() {
    element.destroy()
  }

  export function focus() {
    element.focus()
  }
</script>

<div bind:this={wrapper} />
