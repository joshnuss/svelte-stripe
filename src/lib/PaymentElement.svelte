<script lang="ts">
  import type {
    StripePaymentElementOptions as Options,
    StripePaymentElement as Element,
    StripePaymentElementChangeEvent as ChangeEvent,
    StripeError,
    StripePaymentElementCardDetailsChangeEvent as DetailsChangeEvent,
    StripePaymentElementSavedPaymentMethodUpdateEvent as UpdateEvent,
    StripePaymentElementSavedPaymentMethodRemoveEvent as RemoveEvent
  } from '@stripe/stripe-js'
  import { getContext, onMount } from 'svelte'
  import type { ElementsContext } from './d.ts'

  interface Props {
    options?: Options
    element?: Element
    onchange?: (event: ChangeEvent) => any
    onready?: (event: { elementType: 'payment' }) => any
    onfocus?: (event: { elementType: 'payment' }) => any
    onblur?: (event: { elementType: 'payment' }) => any
    onescape?: (event: { elementType: 'payment' }) => any
    onloaderror?: (event: { elementType: 'payment'; error: StripeError }) => any
    onloaderstart?: (event: { elementType: 'payment' }) => any
    oncarddetailschange?: (event: DetailsChangeEvent) => any
    onsavedpaymentmethodupdate?: (event: UpdateEvent) => any
    onsavedpaymentmethodremove?: (event: RemoveEvent) => any
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
    onsavedpaymentmethodremove = () => {}
  }: Props = $props()

  let wrapper = $state<HTMLElement>()

  const { elements }: ElementsContext = getContext('stripe')

  onMount(() => {
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

  export function collapse() {
    element?.collapse()
  }
</script>

<div bind:this={wrapper}></div>

<style>
  div { display: contents }
</style>
