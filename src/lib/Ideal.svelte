<script lang="ts">
  import type {
    StripeElementClasses as Classes,
    StripeElementStyle as Style,
    StripeIdealBankElement as Element,
    StripeIdealBankElementChangeEvent as ChangeEvent
  } from '@stripe/stripe-js'
  import { getContext, onMount } from 'svelte'
  import type { ElementsContext } from './d.ts'

  interface Props {
    classes?: Classes
    style?: Style
    value?: string
    disabled?: boolean
    hideIcon?: boolean
    element?: Element
    onchange?: (event: ChangeEvent) => any
    onready?: (event: { elementType: 'idealBank' }) => any
    onfocus?: (event: { elementType: 'idealBank' }) => any
    onblur?: (event: { elementType: 'idealBank' }) => any
    onescape?: (event: { elementType: 'idealBank' }) => any
  }

  let {
    classes = {},
    style = {},
    value = '',
    disabled = false,
    hideIcon = true,
    element = $bindable(),
    onchange = () => {},
    onready = () => {},
    onfocus = () => {},
    onblur = () => {},
    onescape = () => {}
  }: Props = $props()

  let wrapper = $state<HTMLElement>()

  const { elements }: ElementsContext = getContext('stripe')

  onMount(() => {
    const options = { classes, style, value, disabled, hideIcon }

    element = elements.create('idealBank', options)
    element.on('change', onchange)
    element.on('ready', onready)
    element.on('focus', onfocus)
    element.on('blur', onblur)
    element.on('escape', onescape)

    element.mount(wrapper!)

    return () => element?.destroy()
  })

  export function blur() {
    element?.blur()
  }

  export function clear() {
    element?.clear()
  }

  export function destroy() {
    element?.destroy()
  }

  export function focus() {
    element?.focus()
  }
</script>

<div bind:this={wrapper}></div>

<style>
  div {
    display: contents;
  }
</style>
