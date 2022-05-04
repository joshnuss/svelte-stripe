<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'

  let stripe = null
  let error = null
  let processing = false
  let email
  let name
  let phone

  onMount(async () => {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY_JP)
  })

  async function createPaymentIntent() {
    // create payment intent
    const response = await fetch('/examples/konbini/payment-intent', {
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
      .confirmKonbiniPayment(clientSecret, {
        payment_method: {
          billing_details: {
            name,
            email
          },
        },
        payment_method_options: {
          konbini: {
            confirmation_number: phone.replace(/\D/g,'')
          },
        }
      })

    // log results, for debugging
    console.log({result})

    if (result.error) {
      // payment failed, notify user
      error = result.error
      processing = false
    } else {
      // payment is ready, show next-steps
      const { hosted_voucher_url } = result.paymentIntent.next_action.konbini_display_details
      goto(`/examples/konbini/next-steps?hosted_voucher_url=${hosted_voucher_url}`)
    }
  }
</script>

<h1>Konbini Example</h1>

<nav>
  <a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/konbini">View code</a>
</nav>

{#if error}
  <p class=error>Payment failed. Please try again.</p>
{/if}

{#if stripe}
  <form on:submit|preventDefault={submit}>
    <input name="name" bind:value={name} placeholder="Name" type='text' required disabled={processing}/>
    <input name="email" bind:value={email} placeholder="E-mail" type='email' required disabled={processing}/>
    <input name="phone" bind:value={phone} placeholder="Phone" type='tel' required disabled={processing}/>

    <button disabled={processing}>
      {#if processing}
        Processing...
      {:else}
        Pay with Konbini
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
