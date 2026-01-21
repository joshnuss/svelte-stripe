<script lang="ts">
  import type {
    StripePaymentMethodMessagingElementOptions as Options,
    StripePaymentMethodMessagingElement as Element
  } from '@stripe/stripe-js'
  import { getContext, onMount } from 'svelte'
  import type { ElementsContext } from './d.ts'

  type Events = {
    onready?: (event: { elementType: 'paymentMethodMessaging' }) => any
  }

  type Bindables = {
    element?: Element
  }

  type Props = Options & Events & Bindables

  let {
    element = $bindable(),
    onready = () => {},
    ...options
  }: Props = $props()

  let wrapper = $state<HTMLElement>()

  const { elements }: ElementsContext = getContext('stripe')

  onMount(() => {
    element = elements.create('paymentMethodMessaging', options)
    element.on('ready', onready)

    element.mount(wrapper!)

    return () => element?.destroy()
  })

  $effect(() => {
    element?.update(options)
  })
</script>

<div bind:this={wrapper}></div>

<style>
  div {
    display: contents;
  }
</style>
