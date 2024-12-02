<script>
  import { register } from './util'

  /**
   * @typedef {Object} Props
   * @property {import('@stripe/stripe-js').Stripe?} stripe
   * @property {string?} clientSecret
   */

  /** @type {Props} */
  let { stripe, clientSecret } = $props()

  let wrapper = $state()

  let checkoutElement = $state()

  $effect(() => {
    if (stripe) {
      register(stripe)
    }
  })

  $effect(() => {
    if (stripe && clientSecret && wrapper) {
      stripe
        .initEmbeddedCheckout({ clientSecret })
        .then((element) => {
          checkoutElement = element
          checkoutElement.mount(wrapper)
        })
    }

    return () => {
      checkoutElement?.destroy()
    }
  })
</script>

{#if stripe && clientSecret}
  <div bind:this={wrapper}></div>
{/if}
