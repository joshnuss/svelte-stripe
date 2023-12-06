<script>
  import { onDestroy } from 'svelte'
  import { register } from './util'

  /** @type {import('@stripe/stripe-js').Stripe?} */
  export let stripe

  /** @type {string?} */
  export let clientSecret

  let wrapper

  let checkoutElement

  $: if (stripe) {
    register(stripe)
  }

  $: if (stripe && clientSecret && wrapper) {
    stripe
      .initEmbeddedCheckout({ clientSecret })
      .then((element) => {
        checkoutElement = element
        checkoutElement.mount(wrapper)
      })
  }

  onDestroy(() => {
    checkoutElement?.destroy()
  });
</script>

{#if stripe && clientSecret}
  <div bind:this={wrapper}/>
{/if}
