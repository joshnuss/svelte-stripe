<script lang="ts">
  import type { StripeExpressCheckoutElement as Element, StripeExpressCheckoutElementOptions as Options, StripeExpressCheckoutElementReadyEvent as ReadyEvent, StripeExpressCheckoutElementClickEvent as ClickEvent, StripeExpressCheckoutElementConfirmEvent as ConfirmEvent, StripeExpressCheckoutElementShippingAddressChangeEvent as AddressChangeEvent, StripeExpressCheckoutElementShippingRateChangeEvent as RateChangeEvent, StripeError } from '@stripe/stripe-js'
  import { getContext } from 'svelte'
  import type { ElementsContext } from './d.ts'

  interface Props {
    buttonHeight?: Options['buttonHeight']
    buttonTheme?: Options['buttonTheme']
    buttonType?: Options['buttonType']
    layout?: Options['layout']
    paymentMethodOrder?: Options['paymentMethodOrder']
    paymentMethods?: Options['paymentMethods']
    element?: Element
    onready?: (event: ReadyEvent) => any
    onclick?: (event: ClickEvent) => any
    onfocus?: (event: {elementType: 'expressCheckout'}) => any
    onblur?: (event: {elementType: 'expressCheckout'}) => any
    onescape?: (event: {elementType: 'expressCheckout'}) => any
    onloaderror?: (event: {elementType: 'expressCheckout'; error: StripeError}) => any
    onconfirm?: (event: ConfirmEvent) => any
    oncancel?: (event: {elementType: 'expressCheckout'}) => any
    onshippingaddresschange?: (event: AddressChangeEvent) => any
    onshippingratechange?: (event: RateChangeEvent) => any
  }

  let {
    buttonHeight = undefined,
    buttonTheme = undefined,
    buttonType = undefined,
    layout = undefined,
    paymentMethodOrder = undefined,
    paymentMethods = undefined,
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
  }: Props = $props()

  let wrapper = $state<HTMLElement>()

  const { elements }: ElementsContext = getContext('stripe')

  $effect(() => {
    if (!wrapper) return

    const options = {
      buttonHeight,
      buttonTheme,
      buttonType,
      layout,
      paymentMethodOrder,
      paymentMethods
    }

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
