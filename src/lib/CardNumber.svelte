<script lang="ts">
  import type {
    StripeElementClasses as Classes,
    StripeElementStyle as Style,
    StripeCardNumberElementChangeEvent as ChangeEvent,
    StripeCardNumberElement as Element,
    StripeError
  } from '@stripe/stripe-js'
  import type { ElementsContext } from './d.ts'
  import { getContext, onMount } from 'svelte'

  interface Props {
    classes?: Classes
    style?: Style
    placeholder?: string
    disabled?: boolean
    showIcon?: boolean
    iconStyle?: 'default' | 'solid'
    element?: Element
    onchange?: (event: ChangeEvent) => any
    onready?: (event: { elementType: 'cardNumber' }) => any
    onfocus?: (event: { elementType: 'cardNumber' }) => any
    onblur?: (event: { elementType: 'cardNumber' }) => any
    onescape?: (event: { elementType: 'cardNumber' }) => any
  }

  let {
    classes = {},
    style = {},
    placeholder = 'Card number',
    disabled = false,
    showIcon = true,
    iconStyle = 'default',
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
    const options = { classes, style, placeholder, disabled, showIcon, iconStyle }

    element = elements.create('cardNumber', options)

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
