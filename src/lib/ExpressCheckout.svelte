<script lang="ts">
  import type {
    StripeExpressCheckoutElement as Element,
    StripeExpressCheckoutElementOptions as Options,
    StripeExpressCheckoutElementReadyEvent as ReadyEvent,
    StripeExpressCheckoutElementClickEvent as ClickEvent,
    StripeExpressCheckoutElementConfirmEvent as ConfirmEvent,
    StripeExpressCheckoutElementShippingAddressChangeEvent as AddressChangeEvent,
    StripeExpressCheckoutElementShippingRateChangeEvent as RateChangeEvent,
    StripeError
  } from '@stripe/stripe-js'
  import { getContext, onMount } from 'svelte'
  import type { ElementsContext } from './d.ts'

  type Events = {
    onready?: (event: ReadyEvent) => any
    onclick?: (event: ClickEvent) => any
    onfocus?: (event: { elementType: 'expressCheckout' }) => any
    onblur?: (event: { elementType: 'expressCheckout' }) => any
    onescape?: (event: { elementType: 'expressCheckout' }) => any
    onloaderror?: (event: { elementType: 'expressCheckout'; error: StripeError }) => any
    onconfirm?: (event: ConfirmEvent) => any
    oncancel?: (event: { elementType: 'expressCheckout' }) => any
    onshippingaddresschange?: (event: AddressChangeEvent) => any
    onshippingratechange?: (event: RateChangeEvent) => any
  }

  type Bindables = {
    element?: Element
  }

  type Props = Options & Events & Bindables

  let {
    element = $bindable(),
    onready = () => {},
    onclick = () => {},
    onfocus = () => {},
    onblur = () => {},
    onescape = () => {},
    onloaderror = () => {},
    onconfirm = () => {},
    oncancel = () => {},
    onshippingaddresschange = () => {},
    onshippingratechange = () => {},
    ...options
  }: Props = $props()

  let wrapper = $state<HTMLElement>()

  const { elements }: ElementsContext = getContext('stripe')

  onMount(() => {
    element = elements.create('expressCheckout', options)

    element.on('ready', onready)
    element.on('click', onclick)
    element.on('focus', onfocus)
    element.on('blur', onblur)
    element.on('escape', onescape)
    element.on('loaderror', onloaderror)
    element.on('confirm', onconfirm)
    element.on('cancel', oncancel)
    element.on('shippingaddresschange', onshippingaddresschange)
    element.on('shippingratechange', onshippingratechange)

    element.mount(wrapper!)

    return () => element?.destroy()
  })

  $effect(() => {
    element?.update(options)
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
