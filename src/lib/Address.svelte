<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { mount } from './util'

  /** @type {import('@stripe/stripe-js').StripeAddressElementOptions["mode"]} */
  export let mode = 'billing'

  /** @type {import('@stripe/stripe-js').StripeAddressElementOptions["allowedCountries"]} */
  export let allowedCountries

  /** @type {import('@stripe/stripe-js').StripeAddressElementOptions["autocomplete"]} */
  export let autocomplete = { mode: 'automatic' }

  /** @type {import('@stripe/stripe-js').StripeAddressElementOptions["blockPoBox"]} */
  export let blockPoBox

  /** @type {import('@stripe/stripe-js').StripeAddressElementOptions["contacts"]} */
  export let contacts

  /** @type {import('@stripe/stripe-js').StripeAddressElementOptions["defaultValues"]} */
  export let defaultValues

  /** @type {import('@stripe/stripe-js').StripeAddressElementOptions["fields"]} */
  export let fields

  /** @type {import('@stripe/stripe-js').StripeAddressElementOptions["validation"]} */
  export let validation

  /** @type {import('@stripe/stripe-js').StripeAddressElementOptions["display"]} */
  export let display

  /** @type {import('@stripe/stripe-js').StripeElementBase} */
  let element

  /** @type {HTMLElement?} */
  let wrapper

  const dispatch = createEventDispatcher()

  /** @type {import("./types").ElementsContext} */
  const { elements } = getContext('stripe')

  onMount(() => {
    const options = {
      mode,
      allowedCountries,
      autocomplete,
      blockPoBox,
      contacts,
      defaultValues,
      fields,
      validation,
      display
    }
    element = mount(wrapper, 'address', elements, dispatch, options)

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
