<script>
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { PUBLIC_STRIPE_KEY } from '$env/static/public'
  import { EmbeddedCheckout } from '$lib'

  export let data

  let stripe = null

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY)
  })
</script>

<h1>Embedded Checkout Example</h1>

<nav>
  <a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/embedded-checkout">View code</a>
</nav>

<EmbeddedCheckout {stripe} clientSecret={data.clientSecret}/>
