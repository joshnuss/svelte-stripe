<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { PUBLIC_STRIPE_KEY } from '$env/static/public'
  import { Elements, PaymentMethodMessaging } from '$lib'

  let stripe = null
  let name

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY)
  })
</script>

<h1>Payment Method Messaging Example</h1>

<nav>
  <a
    href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-method-messaging"
    >View code</a
  >
</nav>

<Elements {stripe}>
  <PaymentMethodMessaging
    currency="USD"
    countryCode="US"
    amount={100000}
    paymentMethodTypes={['afterpay_clearpay', 'klarna', 'affirm']}
  />
</Elements>
