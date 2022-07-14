<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { Elements, Ideal } from '$lib'

  let stripe = null
  let error = null
  let idealElement
  let processing = false
  let name
  let email

  onMount(async () => {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

    // check if ?error=true query string is set
    const searchParams = new URLSearchParams(window.location.search)
    error = searchParams.get('error')
  })

  async function createPaymentIntent() {
    // create payment intent
    const response = await fetch('/examples/ideal/payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({amount: 2000})
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
      .confirmIdealPayment(clientSecret, {
        payment_method: {
          ideal: idealElement,
          billing_details: {
            name,
            email
          }
        },
        return_url: `${window.location.origin}/examples/ideal/return`
      })

    // log results, for debugging
    console.log({result})

    if (result.error) {
      // payment failed, notify user
      error = result.error
      processing = false
    } else {
      // payment succeeded, redirect to "thank you" page
      goto('/examples/ideal/thanks')
    }
  }
</script>

<h1>iDEAL Example</h1>

<nav>
  <a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/ideal">View code</a>
</nav>

{#if error}
  <p class=error>Payment failed. Please try again.</p>
{/if}

{#if stripe}
  <Elements {stripe}>
    <form on:submit|preventDefault={submit}>
      <input name="name" bind:value={name} placeholder="Name" disabled={processing}/>
      <input name="email" bind:value={email} placeholder="E-mail" type='email' disabled={processing}/>
      <Ideal bind:element={idealElement} classes={{base: 'input'}}/>

      <button disabled={processing}>
        {#if processing}
          Processing...
        {:else}
          Pay
        {/if}
      </button>
    </form>
  </Elements>
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
