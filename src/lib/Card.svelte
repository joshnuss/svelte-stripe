<script>
  import { mount } from './util'
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  /**
   * @typedef {object} Props
   * @property {import('@stripe/stripe-js').StripeElementClasses} [classes]
   * @property {import('@stripe/stripe-js').StripeElementStyle} [style]
   * @property {import('@stripe/stripe-js').StripeCardElementOptions["value"]?} [value]
   * @property {boolean?} [hidePostalCode]
   * @property {boolean?} [hideIcon]
   * @property {boolean?} [disabled]
   * @property {'default' | 'solid'} [iconStyle]
   * @property {import('@stripe/stripe-js').StripeElementBase?} [element]
   */

  /** @type {Props} */
  let {
    classes = {},
    style = {},
    value = {},
    hidePostalCode = false,
    hideIcon = false,
    disabled = false,
    iconStyle = 'default',
    element = $bindable()
  } = $props();

  /** @type {HTMLElement?} */
  let wrapper = $state()

  const dispatch = createEventDispatcher()

  /** @type {import("./types").ElementsContext} */
  const { elements } = getContext('stripe')

  onMount(() => {
    const options = { classes, style, value, hidePostalCode, hideIcon, disabled, iconStyle }

    element = mount(wrapper, 'card', elements, dispatch, options)

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
