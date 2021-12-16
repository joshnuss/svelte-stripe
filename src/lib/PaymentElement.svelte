<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { mount, isServer, register } from './util'

  export let stripe
  export let clientSecret
  export let theme = 'stripe'
  export let variables = {}
  export let rules = {}
  export let labels = 'above'
  export let elements = isServer ? null : stripe.elements({ appearance: { theme, variables, rules, labels }, clientSecret })

  let wrapper
  let element
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
