<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { mount } from './util'

  export let classes = {}
  export let style = {}
  export let value = null
  export let disabled = false
  export let hideIcon = true
  export let element = null

  let wrapper
  const dispatch = createEventDispatcher()
  const { elements } = getContext('stripe')

  onMount(() => {
    const options = { classes, style, value, disabled, hideIcon }

    element = mount(wrapper, 'idealBank', elements, dispatch, options)

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
