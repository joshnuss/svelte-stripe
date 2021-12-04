<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { mount } from './util'

  export let classes = {}
  export let style = {}
  export let supportedCountries = []
  export let placeholderCountry = ""
  export let hideIcon = false
  export let iconStyle = 'default'
  export let disabled = false
  export let element = null

  let wrapper
  const dispatch = createEventDispatcher()
  const { elements } = getContext('stripe')

  onMount(() => {
    const options = { classes, style, supportedCountries, placeholderCountry, disabled, hideIcon, iconStyle }

    element = mount(wrapper, 'iban', elements, dispatch, options)

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
