<script>
  import { mount } from './util'
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  /** @typedef { import('@stripe/stripe-js').StripeExpressCheckoutElementOptions } Options */

  /**
   * @typedef {object} Props
   * @property {Options['buttonHeight']} [buttonHeight]
   * @property {Options['buttonTheme']} [buttonTheme]
   * @property {Options['buttonType']} [buttonType]
   * @property {Options['layout']} [layout]
   * @property {Options['paymentMethodOrder']} [paymentMethodOrder]
   * @property {Options['wallets']} [wallets]
   * @property {import('@stripe/stripe-js').StripeElementBase?} [element]
   */

  /** @type {Props} */
  let {
    buttonHeight = undefined,
    buttonTheme = undefined,
    buttonType = undefined,
    layout = undefined,
    paymentMethodOrder = undefined,
    wallets = undefined,
    element = $bindable()
  } = $props();

  /** @type {HTMLElement?} */
  let wrapper = $state()

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

<div bind:this={wrapper}></div>
