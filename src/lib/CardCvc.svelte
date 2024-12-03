<script lang="ts">
  import type { StripeElementClasses, StripeElementStyle, StripeCardElementOptions, StripeCardCvcElement, StripeCardCvcElementChangeEvent, StripeError, StripePaymentRequestButtonElement, StripePaymentRequestButtonElementOptions } from '@stripe/stripe-js'
  import type { ElementsContext } from './d.ts'
  import { getContext } from 'svelte'

  interface Props {
    classes?: StripeElementClasses
    style?: StripeElementStyle
    placeholder?: string
    disabled?: boolean
    element?: StripeCardCvcElement
    onchange?: (event: StripeCardCvcElementChangeEvent) => any
    onready?: (event: {elementType: 'cardCvc'}) => any
    onfocus?: (event: {elementType: 'cardCvc'}) => any
    onblur?: (event: {elementType: 'cardCvc'}) => any
    onescape?: (event: {elementType: 'cardCvc'}) => any
  }

  let {
    classes = {},
    style = {},
    placeholder = 'CVC',
    disabled = false,
    element = $bindable(),
    onchange = () => {},
    onready = () => {},
    onfocus = () => {},
    onblur = () => {},
    onescape = () => {},
  }: Props = $props();

  let wrapper = $state<HTMLElement>()

  const { elements }: ElementsContext = getContext('stripe')

  $effect(() => {
    if (!wrapper) return

    const options = { classes, style, placeholder, disabled }

    element = elements.create('cardCvc', options)

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
