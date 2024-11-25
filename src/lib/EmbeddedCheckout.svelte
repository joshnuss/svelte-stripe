<script>
  import { run } from 'svelte/legacy';
  import { onDestroy } from 'svelte'
  import { register } from './util'

  /**
   * @typedef {Object} Props
   * @property {import('@stripe/stripe-js').Stripe?} stripe
   * @property {string?} clientSecret
   */

  /** @type {Props} */
  let { stripe, clientSecret } = $props();

  let wrapper = $state()

  let checkoutElement = $state()

  run(() => {
    if (stripe) {
      register(stripe)
    }
  });

  run(() => {
    if (stripe && clientSecret && wrapper) {
      stripe
        .initEmbeddedCheckout({ clientSecret })
        .then((element) => {
          checkoutElement = element
          checkoutElement.mount(wrapper)
        })
    }
  });

  onDestroy(() => {
    checkoutElement?.destroy()
  });
</script>

{#if stripe && clientSecret}
  <div bind:this={wrapper}></div>
{/if}
