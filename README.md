# svelte-stripe-js

Everything you need to add Stripe to your Svelte project

## Creating a payment form

This package provides components:

- `Container`: A wrapper components that sets context.
- `CardNumber`: Input for the card's number.
- `CardExpiry`: Input for the card's expiration date.
- `CardCvc`: Input for Card Verification Value.
- `Card`: All-in-one component that has inputs for card number, expiry, cvc, and zip code.
- `PaymentRequestButton`: A GooglePay or ApplePay button, depending on browser.

## TODO

- [+] Apple Pay
- [+] Google Pay
- [+] PaymentRequest
- [ ] SEPA
- [ ] iDEAL

## Usage

Install the package:

```bash
pnpm add -D svelte-stripe-js
```

In your main template, include `stripe.js` from the CDN:

```html
<script src="https://js.stripe.com/v3/"></script>
```

### Credit card form

Then in your payment form:

```html
<script>
  import { Container, CardNumber, CardExpiry, CardCvc } from 'svelte-stripe-js'

  const stripe = Stripe('pk_test_xyz')

  let container

  async function submit() {
    const card = container.getElement()
    const result = await stripe.createToken(card)

    // create payment intent
  }
</script>

<Container {stripe} bind:this={container}>
  <form on:submit|preventDefault={submit}>
    <CardNumber />
    <CardExpiry />
    <CardCvc />

    <button>Pay</button>
  </form>
</Container>
```

### GooglePay/ApplePay button

```html
<script>
  import { Container, PaymentRequestButton } from 'svelte-stripe-js'
  const stripe = Stripe('pk_test_xyz')

  let clientSecret = '...' // the payment intent's clientSecret, should come from server

  // define payment details
  const paymentRequest = {
    country: 'US',
    currency: 'usd',
    total: {label: 'Demo total', amount: 1099},
    requestPayerName: true,
    requestPayerEmail: true,
  }

  async function paymentMethod(e) {
    const paymentMethod = e.detail.paymentMethod

    let result = await stripe.confirmCardPayment(clientSecret, 
      { payment_method: paymentMethod.id }
    )

    if (result.error) {
      e.detail.complete('fail')

      // payment failed, notify user
    } else {
      e.detail.complete('success')

      // payment succeeded, redirect to "thank you" page
    }
  }
</script>

<Container {stripe}>
  <PaymentRequestButton {paymentRequest} on:paymentmethod={paymentMethod}/>
</Container>
```

## License

MIT
