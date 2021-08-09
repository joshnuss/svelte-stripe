# svelte-stripe-js

Everything you need to add Stripe to your Svelte project

## Creating a payment form

This package provides the following components:

- `<Container/>`: A wrapper component to set context.
- `<CardNumber/>`: Input field for the card's number.
- `<CardExpiry/>`: Input field for the card's expiration date.
- `<CardCvc/>`: Input field for Card Verification Value.
- `<Card/>`: All-in-one component that has inputs for card number, expiry, cvc, and zip code.
- `<PaymentRequestButton/>`: A GooglePay or ApplePay button, depending on browser.

## Usage

Install the package:

```bash
pnpm add -D svelte-stripe-js
```

In your main template, include `stripe.js` from the CDN:

```html
<script src="https://js.stripe.com/v3/"></script>
```

Then setup your form, according to what types of payment you want to capture.

### Credit card form

In your payment form, add `<CardNumber/>`, `<CardExpiry/>`, and `<CardCvc/>` components.

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

To accept GPay or ApplePay, add a `<PaymentRequestButton/>` to your payment form:

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

### SEPA

To accept SEPA direct deposit, add an `<Iban/>` component to your payment form:

```html
<script>
  import { Container, Iban } from 'svelte-stripe-js'
  const stripe = Stripe('pk_test_xyz')

  let name, email

  let clientSecret = '...' // the payment intent's clientSecret, should come from server

  async function submit() {
    const iban = container.getElement('iban')
    const result = await stripe.confirmSepaDebitPayment(
      clientSecret,
      {
        payment_method: {
          sepa_debit: iban,
          billing_details: {
            name,
            email,
          },
        },
      }
    )

    // use result.paymentIntent
  }
</script>

<Container {stripe}>
  <form on:submit|preventDefault={submit}>
    <input bind:value={name} placeholder="Name"/>
    <input bind:value={email} placeholder="E-mail" type='email'/>
    <Iban supportedCountries={['SEPA']}/>

    <button>Pay</button>
  </form>
</Container>
```

## TODO

- [x] Credit cards
- [x] Apple Pay
- [x] Google Pay
- [x] PaymentRequest
- [x] SEPA
- [ ] iDEAL

## License

MIT
