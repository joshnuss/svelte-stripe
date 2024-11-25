<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { mount } from './util'

  /** @typedef {import('@stripe/stripe-js').StripeAddressElementOptions} StripeAddressElementOptions */

  /**
   * @typedef {object} Props
   * @property {StripeAddressElementOptions["mode"]} mode
   * @property {StripeAddressElementOptions["allowedCountries"]} [allowedCountries]
   * @property {StripeAddressElementOptions["autocomplete"]} [autocomplete]
   * @property {StripeAddressElementOptions["blockPoBox"]} [blockPoBox]
   * @property {StripeAddressElementOptions["contacts"]} [contacts]
   * @property {StripeAddressElementOptions["defaultValues"]} [defaultValues]
   * @property {StripeAddressElementOptions["fields"]} [fields]
   * @property {StripeAddressElementOptions["validation"]} [validation]
   * @property {StripeAddressElementOptions["display"]} [display]
   */

  /** @type {Props} */
  let {
    mode,
    allowedCountries = undefined,
    autocomplete = { mode: 'automatic' },
    blockPoBox = undefined,
    contacts = undefined,
    defaultValues = undefined,
    fields = undefined,
    validation = undefined,
    display = undefined
  } = $props();

  /** @type {import('@stripe/stripe-js').StripeElementBase} */
  let element

  /** @type {HTMLElement?} */
  let wrapper = $state()

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

<div bind:this={wrapper}></div>
