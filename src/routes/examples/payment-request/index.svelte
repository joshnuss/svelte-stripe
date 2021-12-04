<script context="module">
  export async function load({ fetch }) {
    // create payment intent
    const response = await fetch('/examples/payment-request/payment-intent', { method: 'POST' })
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
  import { Container, PaymentRequestButton } from '$lib'

  export let clientSecret

  let stripe = null
  let error = null

  // define payment details
  const paymentRequest = {
    country: 'US',
    currency: 'usd',
    total: {label: 'Demo total', amount: 1099},
    requestPayerName: true,
    requestPayerEmail: true,
  }

  onMount(async () => {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  })

  async function pay(e) {
    const paymentMethod = e.detail.paymentMethod

    let result = await stripe.confirmCardPayment(clientSecret,
      { payment_method: paymentMethod.id }
    )

    if (result.error) {
      e.detail.complete('fail')

      // payment failed, notify user
      error = result.error
    } else {
      e.detail.complete('success')

      // payment succeeded, redirect to "thank you" page
      goto('/examples/payment-request/thanks')
    }
  }
</script>

<h1>Payment Request Example</h1>

<p>If you see a blank screen, it's because this demo will only work if the TLD is <code>https://localhost</code> or if you're using production keys.</p>
<p>For ApplePay, the production domain must be <a href="https://support.stripe.com/questions/enable-apple-pay-on-your-stripe-account">submitted to Apple</a>.</p>

{#if error}
  <p class=error>{error.message} Please try again.</p>
{/if}

{#if stripe}
  <Container {stripe}>
    <div class="wrapper">
      <PaymentRequestButton {paymentRequest} on:paymentmethod={pay}/>
    </div>
  </Container>
{:else}
  Loading...
{/if}

<style>
  .error { color: tomato }
  .wrapper {
    margin: 3rem 0;
    width: 300px;
  }
</style>
