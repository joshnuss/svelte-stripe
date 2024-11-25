<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { mount } from './util'

  /**
   * @typedef {object} Props
   * @property {import('@stripe/stripe-js').StripeElementClasses} [classes]
   * @property {import('@stripe/stripe-js').StripeElementStyle} [style]
   * @property {string?} [value]
   * @property {boolean?} [disabled]
   * @property {boolean?} [hideIcon]
   * @property {import('@stripe/stripe-js').StripeElementBase?} [element]
   */

  /** @type {Props} */
  let {
    classes = {},
    style = {},
    value = '',
    disabled = false,
    hideIcon = true,
    element = $bindable()
  } = $props();

  /** @type {HTMLElement?} */
  let wrapper = $state()

  const dispatch = createEventDispatcher()

  /** @type {import("./types").ElementsContext} */
  const { elements } = getContext('stripe')

  onMount(() => {
    const options = { classes, style, value, disabled, hideIcon }

    element = mount(wrapper, 'idealBank', elements, dispatch, options)

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
