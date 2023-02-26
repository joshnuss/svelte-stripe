<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { mount } from './util'

  /** @typedef {import('@stripe/stripe-js').StripeAddressElementOptions} StripeAddressElementOptions */

  /** @type {StripeAddressElementOptions["mode"]} */
  export let mode = 'billing'

  /** @type {StripeAddressElementOptions["allowedCountries"]} */
  export let allowedCountries

  /** @type {StripeAddressElementOptions["autocomplete"]} */
  export let autocomplete = { mode: 'automatic' }

  /** @type {StripeAddressElementOptions["blockPoBox"]} */
  export let blockPoBox

  /** @type {StripeAddressElementOptions["contacts"]} */
  export let contacts

  /** @type {StripeAddressElementOptions["defaultValues"]} */
  export let defaultValues

  /** @type {StripeAddressElementOptions["fields"]} */
  export let fields

  /** @type {StripeAddressElementOptions["validation"]} */
  export let validation

  /** @type {StripeAddressElementOptions["display"]} */
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
