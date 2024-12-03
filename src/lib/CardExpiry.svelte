<script lang="ts">
  import type {
    StripeElementClasses,
    StripeElementStyle,
    StripeCardElementOptions,
    StripeCardExpiryElement,
    StripeCardExpiryElementChangeEvent,
    StripeError
  } from '@stripe/stripe-js'
  import type { ElementsContext } from './d.ts'
  import { getContext } from 'svelte'

  interface Props {
    classes?: StripeElementClasses
    style?: StripeElementStyle
    placeholder?: string
    disabled?: boolean
    element?: StripeCardExpiryElement
    onchange?: (event: StripeCardExpiryElementChangeEvent) => any
    onready?: (event: { elementType: 'cardExpiry' }) => any
    onfocus?: (event: { elementType: 'cardExpiry' }) => any
    onblur?: (event: { elementType: 'cardExpiry' }) => any
    onescape?: (event: { elementType: 'cardExpiry' }) => any
  }

  let {
    classes = {},
    style = {},
    placeholder = 'MM / YY',
    disabled = false,
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
    const options = { classes, style, placeholder, disabled }

    element = elements.create('cardExpiry', options)

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
