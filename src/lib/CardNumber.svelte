<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { mount } from './util'

  export let classes = {}
  export let style = {}
  export let placeholder = 'Card number'
  export let disabled = false
  export let showIcon = true
  export let iconStyle = 'default'

  let wrapper
  let element
  const dispatch = createEventDispatcher()
  const { elements } = getContext('stripe')

  onMount(() => {
    const options = {classes, style, placeholder, disabled, showIcon, iconStyle }

    element = mount(wrapper, 'cardNumber', elements, dispatch, options)

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

