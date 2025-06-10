<script lang="ts">
  import type {
    StripeElementClasses as Classes,
    StripeElementStyle as Style,
    StripeCardElementOptions as Options,
    StripeCardElement as Element,
    StripeCardElementChangeEvent as ChangeEvent,
    StripeError
  } from '@stripe/stripe-js'
  import type { ElementsContext } from './d.ts'
  import { getContext } from 'svelte'

  interface Props {
    classes?: Classes
    style?: Style
    value?: Options['value']
    hidePostalCode?: boolean
    hideIcon?: boolean
    disabled?: boolean
    iconStyle: 'default' | 'solid'
    element?: Element
    onchange?: (event: ChangeEvent) => any
    onready?: (event: { elementType: 'card' }) => any
    onfocus?: (event: { elementType: 'card' }) => any
    onblur?: (event: { elementType: 'card' }) => any
    onescape?: (event: { elementType: 'card' }) => any
    onnetworkschange?: (event: { elementType: 'card' }) => any
    onloaderror?: (event: { elementType: 'card'; error: StripeError }) => any
  }

  let {
    classes = {},
    style = {},
    value = {},
    hidePostalCode = false,
    hideIcon = false,
    disabled = false,
    iconStyle = 'default',
    element = $bindable(),
    onchange = () => {},
    onready = () => {},
    onfocus = () => {},
    onblur = () => {},
    onescape = () => {},
    onnetworkschange = () => {},
    onloaderror = () => {}
  }: Props = $props()

  let wrapper = $state<HTMLElement>()

  const { elements }: ElementsContext = getContext('stripe')

  $effect(() => {
    if (!wrapper) return

    const options = { classes, style, value, hidePostalCode, hideIcon, disabled, iconStyle }

    element = elements.create('card', options)

    element.on('change', onchange)
    element.on('ready', onready)
    element.on('focus', onfocus)
    element.on('blur', onblur)
    element.on('escape', onescape)
    element.on('networkschange', onnetworkschange)
    element.on('loaderror', onloaderror)

    element.mount(wrapper)

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
