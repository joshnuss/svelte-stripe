<script lang="ts">
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { PUBLIC_STRIPE_KEY } from '$env/static/public'
  import { Elements, PaymentElement, LinkAuthenticationElement, Address } from '$lib/index.js'
  import type { Stripe, StripeElements } from '@stripe/stripe-js'

  let stripe = $state<Stripe | null>()
  let clientSecret = $state<string | null>(null)
  let error = $state<string | null>()
  let elements = $state<StripeElements>()
  let processing = $state(false)

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY)

    // create payment intent server side
    clientSecret = await createPaymentIntent()
  })

  async function createPaymentIntent() {
    const response = await fetch('/examples/payment-element/payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({})
    })
    const { clientSecret } = await response.json()

    return clientSecret
  }

  async function submit(event: SubmitEvent) {
    event.preventDefault()

    // avoid processing duplicates
    if (processing || !stripe || !elements || !clientSecret) return

    processing = true

    // confirm payment with stripe
    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/examples/payment-element/thanks`
      }
    })

    // log results, for debugging
    console.log({ result })

    if (result.error) {
      // payment failed, notify user
      error = result.error.message
      processing = false
    }
  }
</script>

<h1>Payment Element Example</h1>

<nav>
  <a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-element"
    >View code</a
  >
</nav>

{#if error}
  <p class="error">{error} Please try again.</p>
{/if}

{#if stripe && clientSecret}
  <Elements
    {stripe}
    {clientSecret}
    theme="flat"
    labels="floating"
    variables={{ colorPrimary: '#7c4dff' }}
    rules={{ '.Input': { border: 'solid 1px #0002' } }}
    bind:elements
  >
    <form onsubmit={submit}>
      <LinkAuthenticationElement />
      <PaymentElement />
      <Address mode="billing" />

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
