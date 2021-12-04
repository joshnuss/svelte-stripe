<script context="module">
  export async function load({ fetch }) {
    // create payment intent
    const response = await fetch('/examples/credit-card/payment-intent', { method: 'POST' })
    const { clientSecret } = await response.json()

    // share payment intent's client secret
    return {
      props: {
        clientSecret
      }
    }
  }
</script>

<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { Container, CardNumber, CardExpiry, CardCvc } from '$lib'

  export let clientSecret

  let stripe = null
  let error = null
  let cardElement
  let name
  let processing = false

  onMount(async () => {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  })

  async function submit() {
    // avoid processing duplicates
    if (processing) return

    processing = true

    // confirm payment with stripe
    const result = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name
          }
        }
      })

    // log results, for debugging
    console.log({result})

    if (result.error) {
      // payment failed, notify user
      error = result.error
      processing = false
    } else {
      // payment succeeded, redirect to "thank you" page
      goto('/examples/credit-card/thanks')
    }
  }
</script>

<h1>Credit Card Example</h1>

{#if error}
  <p class=error>{error.message} Please try again.</p>
{/if}

{#if stripe}
  <Container {stripe}>
    <form on:submit|preventDefault={submit}>
      <input name="name" bind:value={name} placeholder="Your name" disabled={processing}/>
      <CardNumber bind:element={cardElement} classes={{base: 'input'}}/>

      <div class="row">
        <CardExpiry classes={{base: 'input'}}/>
        <CardCvc classes={{base: 'input'}}/>
      </div>

      <button disabled={processing}>Pay</button>
    </form>
  </Container>
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

  .row {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }

  input, :global(.input) {
    border: solid 1px var(--gray-color);
    padding: 1rem;
    border-radius: 5px;
    background: white;
  }

  .row :global(.input) {
    width: 20%;
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
