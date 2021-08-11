# svelte-stripe-js

Everything you need to add Stripe to your Svelte project

## Components

This package provides the following components:

- `<Container/>`: A wrapper component to set context.
- `<CardNumber/>`: Input field for the card's number.
- `<CardExpiry/>`: Input field for the card's expiration date.
- `<CardCvc/>`: Input field for Card Verification Value.
- `<Card/>`: All-in-one component that has inputs for card number, expiry, cvc, and zip code.
- `<PaymentRequestButton/>`: A GooglePay or ApplePay button, depending on browser.
- `<Iban/>`: Input field for IBAN (International bank account number)

## Supported payment types

- Credit card
- Google Pay
- Apple Pay
- SEPA direct deposit
- iDEAL (coming soon)

Please open a PR or issue, if you'd like to add more.

## Usage

Install the package:

```bash
pnpm add -D svelte-stripe-js
```

In your app's `index.html` (or `app.html` in svelte-kit), include `stripe.js` from the CDN, and place it inside the `<head>` tag:

```html
<head>
  <!-- place before your app's script -->
  <script src="https://js.stripe.com/v3/"></script>
</head>
```

Add your Stripe public key to the environment vars in your `.env`:

```
VITE_STRIPE_PUBLIC_KEY=pk_....
```

Then setup your form, according to what types of payment you want to capture.

### Credit cards

In your payment form, add `<CardNumber/>`, `<CardExpiry/>`, and `<CardCvc/>` components.

```html
<script>
  import { Container, CardNumber, CardExpiry, CardCvc } from 'svelte-stripe-js'

  const stripe = Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

  let cardElement

  async function submit() {
    const result = await stripe.createToken(cardElement)

    // create payment intent
  }
</script>

<Container {stripe}>
  <form on:submit|preventDefault={submit}>
    <CardNumber bind:element={cardElement}/>
    <CardExpiry />
    <CardCvc />

    <button>Pay</button>
  </form>
</Container>
```

### GooglePay or ApplePay

To accept GPay or ApplePay, add a `<PaymentRequestButton/>` to your payment form:

```html
<script>
  import { Container, PaymentRequestButton } from 'svelte-stripe-js'
  const stripe = Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

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
  const stripe = Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

  let name, email
  let ibanElement

  let clientSecret = '...' // the payment intent's clientSecret, should come from server

  async function submit() {
    const result = await stripe.confirmSepaDebitPayment(
      clientSecret,
      {
        payment_method: {
          sepa_debit: ibanElement,
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
    <Iban supportedCountries={['SEPA']} bind:element={ibanElement}/>

    <button>Pay</button>
  </form>
</Container>
```

### iDEAL

To accept SEPA direct deposit, add an `<Iban/>` component to your payment form:

```html
<script>
  import { Container, Ideal } from 'svelte-stripe-js'
  const stripe = Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

  let name
  let idealElement

  let clientSecret = '...' // the payment intent's clientSecret, should come from server

  async function submit() {
    const result = await stripe.confirmIdealPayment(
      clientSecret,
      {
        payment_method: {
          ideal: ibanElement,
          billing_details: {
            name,
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
    <Ideal bind:element={idealElement}/>

    <button>Pay</button>
  </form>
</Container>
```

### Svelte-kit

This is fully compatible with svelte-kit. Just be sure to not instantiate `Stripe()` on the server side:

```html
<script>
  import { isServer } from 'svelte-stripe-js'

  const stripe = isServer ? null : Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
</script>
```

Also, add `svelte-stripe-js` to the `noExternal` list in `svelte.config.js`:

```javascript
/** @type {import('@sveltejs/kit').config} */
const config = {
  kit: {
    // ...

    vite: {
      ssr: {
        noExternal: ["svelte-stripe-js"],
      }
    }
  },
}
```

## TODO

- [x] Credit cards
- [x] Apple Pay
- [x] Google Pay
- [x] PaymentRequest
- [x] SEPA
- [x] iDEAL

## License

MIT
