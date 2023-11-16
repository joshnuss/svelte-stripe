<script>
  import { register } from './util'

  /** @type {import('@stripe/stripe-js').Stripe?} */
  export let stripe

  /** @type {string?} */
  export let clientSecret

  let wrapper

  $: if (stripe) {
    register(stripe)
  }

  $: if (stripe && clientSecret && wrapper) {
    stripe
      .initEmbeddedCheckout({ clientSecret })
      .then((element) => {
        element.mount(wrapper)
      })
  }
</script>

{#if stripe && clientSecret}
  <div bind:this={wrapper}/>
{/if}
