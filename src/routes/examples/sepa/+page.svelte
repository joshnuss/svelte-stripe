<script lang="ts">
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { PUBLIC_STRIPE_KEY } from '$env/static/public'
  import { Elements, Iban } from '$lib/index.js'
  import type { Stripe, StripeIbanElement } from '@stripe/stripe-js'

  let stripe = $state<Stripe | null>()
  let error = $state<string | null>()
  let ibanElement = $state<StripeIbanElement>()
  let processing = $state(false)
  let name = $state<string>('')
  let email = $state<string>('')

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY)
  })

  async function createPaymentIntent() {
    const response = await fetch('/examples/sepa/payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ amount: 2000 })
    })
    const { clientSecret } = await response.json()

    return clientSecret
  }

  async function submit(event: SubmitEvent) {
    event.preventDefault()

    // avoid processing duplicates
    if (processing || !stripe || !ibanElement) return

    processing = true

    // create payment intent server-side
    const clientSecret = await createPaymentIntent()

    // confirm payment with stripe
    const result = await stripe.confirmSepaDebitPayment(clientSecret, {
      payment_method: {
        sepa_debit: ibanElement,
        billing_details: {
          name,
          email
        }
      }
    })

    // log results, for debugging
    console.log({ result })

    if (result.error) {
      // payment failed, notify user
      error = result.error.message
      processing = false
    } else {
      // payment succeeded, redirect to "thank you" page
      goto('/examples/sepa/thanks')
    }
  }
</script>

<h1>SEPA Example</h1>

<nav>
  <a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/sepa"
    >View code</a
  >
</nav>

{#if error}
  <p class="error">{error} Please try again.</p>
{/if}

{#if stripe}
  <Elements {stripe}>
    <form onsubmit={submit}>
      <input name="name" bind:value={name} placeholder="Name" disabled={processing} />
      <input
        name="email"
        bind:value={email}
        placeholder="E-mail"
        type="email"
        disabled={processing}
      />
      <Iban supportedCountries={['SEPA']} bind:element={ibanElement} classes={{ base: 'input' }} />

      <button disabled={processing}>
        {#if processing}
          Processing...
        {:else}
          Pay
        {/if}
      </button>
    </form>
  </Elements>
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

  input,
  :global(.input) {
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
