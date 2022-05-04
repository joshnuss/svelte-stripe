<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'

  let stripe = null
  let error = null
  let processing = false
  let email

  onMount(async () => {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

    // check if ?error=true query string is set
    const searchParams = new URLSearchParams(window.location.search)
    error = searchParams.get('error')
  })

  async function createPaymentIntent() {
    // create payment intent
    const response = await fetch('/examples/alipay/payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    const { clientSecret } = await response.json()

    return clientSecret
  }

  async function submit() {
    // avoid processing duplicates
    if (processing) return

    processing = true

    // create payment intent server side
    const clientSecret = await createPaymentIntent()

    // confirm payment with stripe
    const result = await stripe
      .confirmAlipayPayment(clientSecret, {
        return_url: `${window.location.origin}/examples/alipay/return`
      })

    // log results, for debugging
    console.log({result})

    if (result.error) {
      // payment failed, notify user
      error = result.error
      processing = false
    } else {
      // payment succeeded, redirect to "thank you" page
      goto('/examples/alipay/thanks')
    }
  }
</script>

<h1>Alipay Example</h1>

<nav>
  <a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/alipay">View code</a>
</nav>

{#if error}
  <p class=error>Payment failed. Please try again.</p>
{/if}

{#if stripe}
  <form on:submit|preventDefault={submit}>
    <input name="email" bind:value={email} placeholder="E-mail" type='email' disabled={processing}/>

    <button disabled={processing}>
      {#if processing}
        Processing...
      {:else}
        Pay with Alipay
      {/if}
    </button>
  </form>
{:else}
  Loading...
{/if}

<style>
  .error {
    color: tomato;
    margin: 2rem 0 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 2rem 0;
  }

  input, :global(.input) {
    border: solid 1px var(--gray-color);
    padding: 1rem;
    border-radius: 5px;
    background: white;
  }

  button {
    padding: 1rem;
    border-radius: 5px;
    border: solid 1px #ccc;
    color: white;
    background: var(--link-color);
    font-size: 1.2rem;
    margin: 1rem 0;
  }
</style>
