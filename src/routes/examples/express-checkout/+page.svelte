<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { PUBLIC_STRIPE_KEY } from '$env/static/public'
  import { Elements, ExpressCheckout } from '$lib'

  let stripe = $state(null)
  let error = $state(null)
  let elements = $state()
  let processing = false

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY)
  })

  async function createPaymentIntent() {
    const response = await fetch('/examples/express-checkout/payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({})
    })
    const { clientSecret } = await response.json()

    return clientSecret
  }

  async function click(event) {
    const options = {
      emailRequired: true,
      phoneNumberRequired: true,
      lineItems: [
        {
          name: 'Rad T-Shirt',
          amount: 1099
        }
      ]
    }

    event.detail.resolve(options)
  }

  async function confirm() {
    // avoid processing duplicates
    if (processing) return

    processing = true

    let result = await elements.submit()

    if (result.error) {
      // validation failed, notify user
      error = result.error
      processing = false
      return
    }

    // create payment intent server side
    const clientSecret = await createPaymentIntent()
    const return_url = new URL('/examples/express-checkout/thanks', window.location.origin).toString()

    // confirm payment with stripe
    result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url
      }
    })

    // log results, for debugging
    console.log({ result })

    if (result.error) {
      // payment failed, notify user
      error = result.error
      processing = false
    } else {
      // payment succeeded, redirect to "thank you" page
      goto('/examples/express-checkout/thanks')
    }
  }
</script>

<h1>Express Checkout Example</h1>

<nav>
  <a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/express-checkout">View code</a>
</nav>

{#if error}
  <p class="error">{error.message} Please try again.</p>
{/if}

<Elements
  {stripe}
  mode="payment"
  currency="usd"
  amount={1099}
  bind:elements>

  <ExpressCheckout
    on:confirm={confirm}
    on:click={click}
    buttonHeight={50}
    buttonTheme={{googlePay: 'white'}}
    buttonType={{googlePay: 'donate'}}
    paymentMethodOrder={['googlePay', 'link']}/>

</Elements>

<style>
  .error {
    color: tomato;
    margin: 2rem 0 0;
  }
</style>
