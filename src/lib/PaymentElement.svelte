<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { mount, isServer } from './util'

  export let stripe
  export let clientSecret
  export let theme = 'stripe'
  export let variables = {}
  export let elements = isServer ? null : stripe.elements({ appearance: { theme, variables }, clientSecret })

  let wrapper
  let element
  const dispatch = createEventDispatcher()

  onMount(() => {
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
