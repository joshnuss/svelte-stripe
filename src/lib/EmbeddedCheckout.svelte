<script lang="ts">
  import type { Stripe, StripeEmbeddedCheckout as Checkout } from '@stripe/stripe-js'
  import { register } from './util.js'
  import { onMount } from 'svelte'

  interface Props {
    stripe: Stripe
    clientSecret: string
    checkout?: Checkout
  }

  let { stripe, clientSecret, checkout = $bindable() }: Props = $props()

  let wrapper = $state<HTMLElement>()

  onMount(() => {
    register(stripe)

    stripe.initEmbeddedCheckout({ clientSecret }).then((result) => {
      checkout = result

      checkout.mount(wrapper!)
    })

    return () => {
      checkout?.destroy()
    }
  })
</script>

<div bind:this={wrapper}></div>

<style>
  div {
    display: contents;
  }
</style>
