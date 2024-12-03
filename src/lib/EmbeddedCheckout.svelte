<script lang="ts">
  import type { Stripe, StripeEmbeddedCheckout as Checkout } from '@stripe/stripe-js'
  import { register } from './util.js'

  interface Props {
    stripe?: Stripe | null
    clientSecret?: string
    checkout?: Checkout
  }

  let { stripe, clientSecret, checkout = $bindable() }: Props = $props()

  let wrapper = $state<HTMLElement>()

  $effect(() => {
    if (stripe) {
      register(stripe)
    }
  })

  $effect(() => {
    if (stripe && clientSecret && wrapper) {
      stripe.initEmbeddedCheckout({ clientSecret }).then((result) => {
        checkout = result

        if (wrapper) checkout.mount(wrapper)
      })
    }

    return () => {
      checkout?.destroy()
    }
  })
</script>

{#if stripe && clientSecret}
  <div bind:this={wrapper}></div>
{/if}
