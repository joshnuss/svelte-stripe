<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { mount } from './util'

  /**
   * @typedef {object} Props
   * @property {import('@stripe/stripe-js').StripeLinkAuthenticationElementOptions["defaultValues"]?} [defaultValues]
   */

  /** @type {Props} */
  let { defaultValues = null } = $props();

  /** @type {import('@stripe/stripe-js').StripeElementBase} */
  let element

  /** @type {HTMLElement?} */
  let wrapper = $state()

  const dispatch = createEventDispatcher()

  /** @type {import("./types").ElementsContext} */
  const { elements } = getContext('stripe')

  onMount(() => {
    const options = defaultValues ? { defaultValues } : {}
    element = mount(wrapper, 'linkAuthentication', elements, dispatch, options)
    element.on('change', (event) => {
      dispatch('change', event)
    })

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
