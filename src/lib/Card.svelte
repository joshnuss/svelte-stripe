<script>
  import { mount } from './util'
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  export let classes = {}
  export let style = {}
  export let value = {}
  export let hidePostalCode = false
  export let hideIcon = false
  export let disabled = false
  export let iconStyle = 'default'

  let wrapper
  let element

  const dispatch = createEventDispatcher()
  const { elements } = getContext('stripe')

  onMount(() => {
    const options = { classes, style, value, hidePostalCode, hideIcon, disabled, iconStyle }
    element = mount(wrapper, 'card', elements, dispatch, options)

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

<div bind:this={wrapper}/>
