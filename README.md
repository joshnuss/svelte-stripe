# svelte-stripe-js

Everything you need to add Stripe to your Svelte project. 100% [svelte-kit](https://kit.svelte.dev/) compatible.

## Components

This package provides the following components:

- `<Container/>`: A wrapper component to set context.
- `<CardNumber/>`: Input field for the card's number.
- `<CardExpiry/>`: Input field for the card's expiration date.
- `<CardCvc/>`: Input field for Card Verification Value.
- `<Card/>`: All-in-one component that has inputs for card number, expiry, cvc, and zip code.
- `<PaymentRequestButton/>`: A GooglePay or ApplePay button, depending on browser.
- `<Iban/>`: Input field for IBAN (International bank account number).
- `<Ideal/>`: Input field for iDEAL (payment system used in the Netherlands).

## Supported payment types

- Credit card
- Google Pay
- Apple Pay
- SEPA direct deposit
- iDEAL

Please open a PR or issue, if you'd like to add more.

## Usage

Install packages:

```bash
pnpm add -D @stripe/stripe-js svelte-stripe-js
```

Add your Stripe public key to the environment vars in your `.env`:

```
VITE_STRIPE_PUBLIC_KEY=pk_....
```

For **svelte-kit**, add `svelte-stripe-js` to the `noExternal` list in `svelte.config.js`:

```javascript
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

And since svelte-kit can render on the server, don't initialize stripe during SSR:

```html
<script>
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { isServer } from 'svelte-stripe-js'

  let stripe = null

  onMount(async () => {
    if (!isServer) {
      stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    }
  })
</script>
```

Now you set up a payment form, according to what types of payment you want to capture.

### Credit cards

In your payment form, add `<CardNumber/>`, `<CardExpiry/>`, and `<CardCvc/>` components.

```html
<script>
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { Container, CardNumber, CardExpiry, CardCvc } from 'svelte-stripe-js'

  let stripe = null
  let cardElement

  onMount(async () => {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  })

  async function submit() {
    const result = await stripe.createToken(cardElement)

    // create payment intent
  }
</script>

{#if stripe}
  <Container {stripe}>
    <form on:submit|preventDefault={submit}>
      <CardNumber bind:element={cardElement}/>
      <CardExpiry />
      <CardCvc />

      <button>Pay</button>
    </form>
  </Container>
{/if}
```

### GooglePay or ApplePay

To accept GPay or ApplePay, add a `<PaymentRequestButton/>` to your payment form:

```html
<script>
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { Container, PaymentRequestButton } from 'svelte-stripe-js'

  let stripe = null
  let clientSecret = '...' // the payment intent's clientSecret, should come from server

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
    } else {
      e.detail.complete('success')

      // payment succeeded, redirect to "thank you" page
    }
  }
</script>

{#if stripe}
  <Container {stripe}>
    <PaymentRequestButton {paymentRequest} on:paymentmethod={pay}/>
  </Container>
{/if}
```

### SEPA

To accept SEPA direct deposit, add an `<Iban/>` component to your payment form:

```html
<script>
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { Container, Iban } from 'svelte-stripe-js'

  let stripe = null
  let name, email
  let ibanElement

  let clientSecret = '...' // the payment intent's clientSecret, should come from server

  onMount(async () => {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  })

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

{#if stripe}
  <Container {stripe}>
    <form on:submit|preventDefault={submit}>
      <input bind:value={name} placeholder="Name"/>
      <input bind:value={email} placeholder="E-mail" type='email'/>
      <Iban supportedCountries={['SEPA']} bind:element={ibanElement}/>

      <button>Pay</button>
    </form>
  </Container>
{/if}
```

### iDEAL

To accept iDEAL, add an `<Ideal/>` component to your payment form:

```html
<script>
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { Container, Ideal } from 'svelte-stripe-js'

  let stripe = null
  let name
  let idealElement
  let clientSecret = '...' // the payment intent's clientSecret, should come from server

  onMount(async () => {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  })

  async function submit() {
    const result = await stripe.confirmIdealPayment(
      clientSecret,
      {
        payment_method: {
          ideal: idealElement,
          billing_details: {
            name,
          },
        },
      }
    )

    // use result.paymentIntent
  }
</script>

{#if stripe}
  <Container {stripe}>
    <form on:submit|preventDefault={submit}>
      <input bind:value={name} placeholder="Name"/>
      <Ideal bind:element={idealElement}/>

      <button>Pay</button>
    </form>
  </Container>
{/if}
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
