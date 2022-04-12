<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { mount, isServer, register } from './util'

  /** @type {import('@stripe/stripe-js').Stripe?} */
  export let stripe

  /** @type {string} */
  export let clientSecret

  /** @typedef { import('@stripe/stripe-js').Appearance } Appearance */

  /** @type {Appearance["theme"]} */
  export let theme = 'stripe'

  /** @type {Appearance["variables"]} */
  export let variables = {}

  /** @type {Appearance["rules"]} */
  export let rules = {}

  /** @type {Appearance["labels"]} */
  export let labels = 'above'

  /** @typedef { import('@stripe/stripe-js').StripeElementsOptions } StripeElementsOptions */

  /** @type {StripeElementsOptions["loader"]} */
  export let loader = 'auto'

  export let elements = isServer ? null : stripe.elements({ appearance: { theme, variables, rules, labels }, clientSecret, loader })

  /** @type {import('@stripe/stripe-js').StripeElementBase} */
  let element

  /** @type {HTMLElement?} */
  let wrapper

  const dispatch = createEventDispatcher()

  onMount(() => {
    register(stripe)
    element = mount(wrapper, 'payment', elements, dispatch)

    return () => element.unmount()
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
