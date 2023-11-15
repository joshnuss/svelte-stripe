<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { mount } from './util'

  /** @typedef {import('@stripe/stripe-js').StripePaymentElementOptions} StripePaymentElementOptions */

  /** @type {import('@stripe/stripe-js').StripeElementBase} */
  let element

  /** @type {HTMLElement?} */
  let wrapper

  const dispatch = createEventDispatcher()

  /** @type {import("./types").ElementsContext} */
  const { elements } = getContext('stripe')

  /** @type {StripePaymentElementOptions?} */
  export let options = undefined

  onMount(() => {
    element = mount(wrapper, 'payment', elements, dispatch, options)

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
