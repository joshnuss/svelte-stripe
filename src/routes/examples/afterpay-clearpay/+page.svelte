<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import Address from './_Address.svelte'

  let stripe = null
  let error = null
  let processing = false
  let email = 'jsmith@example.com'
  let name = 'John Smith'
  let billingAddress = {
    line1: '123 Main',
    line2: 'Apt 100',
    state: 'CA',
    city: 'Los Angeles',
    country: 'US',
    postal_code: '1000'
  }
  let shippingAddress = {
    line1: '123 Main',
    line2: 'Apt 100',
    state: 'CA',
    city: 'Los Angeles',
    country: 'US',
    postal_code: '1000'
  }

  onMount(async () => {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

    // check if ?error=true query string is set
    const searchParams = new URLSearchParams(window.location.search)
    error = searchParams.get('error')
  })

  async function createPaymentIntent() {
    // create payment intent
    const response = await fetch('/examples/afterpay-clearpay/payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
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
      .confirmAfterpayClearpayPayment(clientSecret, {
        payment_method: {
          billing_details: {
            name,
            email,
            address: billingAddress
          }
        },
        shipping: {
          name,
          address: shippingAddress,
        },
        return_url: `${window.location.origin}/examples/afterpay-clearpay/return`
      })

    // log results, for debugging
    console.log({result})

    if (result.error) {
      // payment failed, notify user
      error = result.error
      processing = false
    }
  }
</script>

<h1>Afterpay/Clearpay Example</h1>

<nav>
  <a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/afterpay-clearpay">View code</a>
</nav>

{#if error}
  <p class=error>Payment failed. Please try again.</p>
{/if}

{#if stripe}
  <form on:submit|preventDefault={submit}>
    <Address legend="Billing" bind:address={billingAddress}>
      <label for="name">
        Name
      </label>
      <input id="name" bind:value={name} required />
      <label for="email">
        Email
      </label>
      <input type="email" id="email" bind:value={email} required />
    </Address>

    <Address legend="Shipping" bind:address={shippingAddress}/>

    <button disabled={processing}>
      {#if processing}
        Processing...
      {:else}
        Pay with Afterpay/Clearpay
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

  form :global(input), :global(.input), form :global(select) {
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
