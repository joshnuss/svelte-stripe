<script lang="ts">
  import type {
    Stripe,
    StripeEmbeddedCheckoutOptions as Options,
    StripeEmbeddedCheckout as Checkout
  } from '@stripe/stripe-js'
  import { register } from './util.js'
  import { onMount } from 'svelte'

  type Props = {
    stripe: Stripe
    checkout?: Checkout
  }

  let { stripe, checkout = $bindable(), ...options }: Options & Props = $props()

  let wrapper = $state<HTMLElement>()

  onMount(() => {
    register(stripe)

    stripe.initEmbeddedCheckout(options).then((result) => {
      checkout = result
      checkout.mount(wrapper!)
    })

    return () => {
      checkout?.destroy()
    }
  })
</script>

<div bind:this={wrapper}></div>
