<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { PUBLIC_STRIPE_KEY } from '$env/static/public'
  import { EmbeddedCheckout } from '$lib'

  let stripe = null
  let clientSecret = null

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY)
    clientSecret = await createCheckoutSession()
  })

  async function createCheckoutSession() {
    const response = await fetch('/examples/embedded-checkout/checkout-session', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({})
    })
    const { clientSecret } = await response.json()

    return clientSecret
  }
</script>

<h1>Embedded Checkout Example</h1>

<nav>
  <a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/embedded-checkout">View code</a>
</nav>

<EmbeddedCheckout {stripe} {clientSecret}/>
