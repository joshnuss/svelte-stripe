<script lang="ts">
  import type {
    StripeElementClasses,
    StripeElementStyle,
    StripeIdealBankElement,
    StripeIdealBankElementChangeEvent
  } from '@stripe/stripe-js'
  import { getContext } from 'svelte'
  import type { ElementsContext } from './d.ts'

  interface Props {
    classes?: StripeElementClasses
    style?: StripeElementStyle
    value?: string
    disabled?: boolean
    hideIcon?: boolean
    element?: StripeIdealBankElement
    onchange?: (event: StripeIdealBankElementChangeEvent) => any
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

  $effect(() => {
    if (!wrapper) return

    const options = { classes, style, value, disabled, hideIcon }

    element = elements.create('idealBank', options)
    element.on('change', onchange)
    element.on('ready', onready)
    element.on('focus', onfocus)
    element.on('blur', onblur)
    element.on('escape', onescape)

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
  div { display: contents }
</style>
