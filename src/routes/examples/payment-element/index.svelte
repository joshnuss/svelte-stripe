<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { PaymentElement } from '$lib'

  let stripe = null
  let clientSecret = null
  let error = null
  let elements
  let processing = false

  onMount(async () => {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

    // create payment intent server side
    clientSecret = await createPaymentIntent()
  })

  async function createPaymentIntent() {
    const response = await fetch('/examples/payment-element/payment-intent', {
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

    // confirm payment with stripe
    const result = await stripe
      .confirmPayment({
        elements,
        redirect: 'if_required'
      })

    // log results, for debugging
    console.log({result})

    if (result.error) {
      // payment failed, notify user
      error = result.error
      processing = false
    } else {
      // payment succeeded, redirect to "thank you" page
      goto('/examples/payment-element/thanks')
    }
  }
</script>

<h1>Payment Element Example</h1>

{#if error}
  <p class=error>{error.message} Please try again.</p>
{/if}

{#if stripe && clientSecret}
  <form on:submit|preventDefault={submit}>
    <PaymentElement
      {stripe}
      {clientSecret}
      bind:elements
      theme="flat"
      labels="floating"
      variables={{colorPrimary: '#7c4dff'}}
      rules={{'.Input': { border: 'solid 1px #0002' }}}
    />

    <button disabled={processing}>
      {#if processing}
        Processing...
      {:else}
        Pay
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
