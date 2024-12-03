<script lang="ts">
  import type { StripePaymentMethodMessagingElementOptions as Options, StripePaymentMethodMessagingElement as Element } from '@stripe/stripe-js'
  import { getContext } from 'svelte'
  import type { ElementsContext } from './d.ts'

  interface Props {
    amount: Options['amount']
    currency: Options['currency']
    paymentMethodTypes?: Options['paymentMethodTypes']
    paymentMethodOrder?: Options['paymentMethodOrder']
    countryCode: Options['countryCode']
    element?: Element,
    onready?: (event: {elementType: 'paymentMethodMessaging'}) => any
  }

  let {
    amount,
    currency,
    paymentMethodTypes,
    paymentMethodOrder,
    countryCode,
    element = $bindable(),
    onready = () => {}
  }: Props = $props();

  let wrapper = $state<HTMLElement>()

  const { elements }: ElementsContext = getContext('stripe')

  $effect(() => {
    if (!wrapper) return

    const options = {
      amount,
      currency,
      paymentMethodTypes,
      paymentMethodOrder,
      countryCode
    }

    element = elements.create('paymentMethodMessaging', options)
    element.on('ready', onready)

    return () => element?.destroy()
  })
</script>

<div bind:this={wrapper}></div>
