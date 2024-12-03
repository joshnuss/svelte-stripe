<script lang="ts">
  import type { StripePaymentElementOptions, StripePaymentElement, StripePaymentElementChangeEvent, StripeError, StripePaymentElementCardDetailsChangeEvent, StripePaymentElementSavedPaymentMethodUpdateEvent, StripePaymentElementSavedPaymentMethodRemoveEvent  } from '@stripe/stripe-js'
  import { getContext } from 'svelte'
  import type { ElementsContext } from './d.ts'

  interface Props {
    options?: StripePaymentElementOptions
    element?: StripePaymentElement
    onchange?: (event: StripePaymentElementChangeEvent) => any
    onready?: (event: {elementType: 'payment'}) => any
    onfocus?: (event: {elementType: 'payment'}) => any
    onblur?: (event: {elementType: 'payment'}) => any
    onescape?: (event: {elementType: 'payment'}) => any
    onloaderror?: (event: {elementType: 'payment'; error: StripeError}) => any
    onloaderstart?: (event: {elementType: 'payment'}) => any
    oncarddetailschange?: (event: StripePaymentElementCardDetailsChangeEvent) => any
    onsavedpaymentmethodupdate?: (event: StripePaymentElementSavedPaymentMethodUpdateEvent) => any
    onsavedpaymentmethodremove?: (event: StripePaymentElementSavedPaymentMethodRemoveEvent) => any
  }

  let {
    options = {},
    element = $bindable(),
    onchange = () => {},
    onready = () => {},
    onfocus = () => {},
    onblur = () => {},
    onescape = () => {},
    onloaderror = () => {},
    onloaderstart = () => {},
    oncarddetailschange = () => {},
    onsavedpaymentmethodupdate = () => {},
    onsavedpaymentmethodremove = () => {},
  }: Props = $props()

  let wrapper = $state<HTMLElement>()

  const { elements }: ElementsContext = getContext('stripe')

  $effect(() => {
    if (!wrapper) return

    element = elements.create('payment', options)

    element.on('change', onchange)
    element.on('ready', onready)
    element.on('focus', onfocus)
    element.on('blur', onblur)
    element.on('escape', onescape)
    element.on('loaderror', onloaderror)
    element.on('loaderstart', onloaderstart)
    element.on('carddetailschange', oncarddetailschange)
    element.on('savedpaymentmethodupdate', onsavedpaymentmethodupdate)
    element.on('savedpaymentmethodremove', onsavedpaymentmethodremove)

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

  export function collapse() {
    element?.collapse()
  }
</script>

<div bind:this={wrapper}></div>
