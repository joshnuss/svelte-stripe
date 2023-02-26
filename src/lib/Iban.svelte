<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { mount } from './util'

  /** @type {import('@stripe/stripe-js').StripeElementClasses} */
  export let classes = {}

  /** @type {import('@stripe/stripe-js').StripeElementStyle} */
  export let style = {}

  /** @type {string[]?} */
  export let supportedCountries = []

  /** @type {string} */
  export let placeholderCountry = ''

  /** @type {boolean?} */
  export let hideIcon = false

  /** @type {'default' | 'solid'} */
  export let iconStyle = 'default'

  /** @type {boolean?} */
  export let disabled = false

  /** @type {import('@stripe/stripe-js').StripeElementBase?} */
  export let element = null

  /** @type {HTMLElement?} */
  let wrapper

  const dispatch = createEventDispatcher()

  /** @type {import("./types").ElementsContext} */
  const { elements } = getContext('stripe')

  onMount(() => {
    const options = {
      classes,
      style,
      supportedCountries,
      placeholderCountry,
      disabled,
      hideIcon,
      iconStyle
    }

    element = mount(wrapper, 'iban', elements, dispatch, options)

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
