<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { mount } from './util'

  /** @typedef {import('@stripe/stripe-js').StripeAddressElementOptions} StripeAddressElementOptions */

  /** @type {StripeAddressElementOptions["mode"]} */
  export let mode

  /** @type {StripeAddressElementOptions["allowedCountries"]} */
  export let allowedCountries = undefined

  /** @type {StripeAddressElementOptions["autocomplete"]} */
  export let autocomplete = { mode: 'automatic' }

  /** @type {StripeAddressElementOptions["blockPoBox"]} */
  export let blockPoBox = undefined

  /** @type {StripeAddressElementOptions["contacts"]} */
  export let contacts = undefined

  /** @type {StripeAddressElementOptions["defaultValues"]} */
  export let defaultValues = undefined

  /** @type {StripeAddressElementOptions["fields"]} */
  export let fields = undefined

  /** @type {StripeAddressElementOptions["validation"]} */
  export let validation = undefined

  /** @type {StripeAddressElementOptions["display"]} */
  export let display = undefined

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
