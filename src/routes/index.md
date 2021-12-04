# svelte-stripe-js

Everything you need to accept Stripe payments with your Svelte projects. [SvelteKit](https://kit.svelte.dev) is fully supported.

Links:
[npm](https://npmjs.org/package/svelte-stripe-js)
[github](https://github.com/joshnuss/svelte-stripe-js)
[license](https://github.com/joshnuss/svelte-stripe-js/blob/main/LICENSE)

## Installation

To configure your project add these 3 packages:

```bash
pnpm install -D svelte-stripe-js @stripe/stripe-js stripe
```

- [svelte-stripe-js](https://npmjs.org/package/svelte-stripe-js) is the Svelte wrapper.
- [@stripe/stripe-js](https://npmjs.org/package/@stripe/stripe-js) is the client side/browser version of Stripe.
- [stripe](https://npmjs.org/package/stripe) is the server-side/NODE version of Stripe.

## Docs

### Set up Stripe

Add your private and public keys to your environment:

```bash
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_STRIPE_KEY=sk_test_...
```

In your payment page, initialize Stripe and add a `<Container>` component:

```html
<script>
  import { loadStripe } from '@stripe/stripe-js'
  import { Container } from  'svelte-stripe-js'

  let stripe = null

  onMount(async () => {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  })
<script>

{#if stripe}
  <Container {stripe}>
    <!-- this is where your Stripe components go -->
  </Container>
{/if}
```

### Creating a payment intent

Before making a charge, Stripe should be notified by creating a [payment intent](https://stripe.com/docs/api/payment_intents). It's a way to tell Stripe what amount to capture and to attach any relavent metadata, for example, the products they are buying. This must happen server-side to avoid anyone tampering with the amount.

Let's add an endpoint `src/routes/create-payment-intent.js` to create the "payment intent":

```javascript
import Stripe from 'stripe'

// initialize Stripe
const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])

// handle POST /create-payment-intent
export async function post() {
  // create the payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    // note, for some EU-only payment methods it must be EUR
    currency: 'usd',
    // specify what payment methods are allowed
    // can be card, sepa_debit, ideal, etc...
    payment_method_types: ['card'],
  })

  // return the clientSecret to the client
  return {
    body: {
      clientSecret: paymentIntent.client_secret
    }
  }
}
```

### Accepting payments

There are several types of payment you can accept:

#### Credit Cards

These use the `<CardNumber>`, `<CardExpiry>` and `<CardCvc>` components:

```html
<Container {stripe}>
  <form on:submit|preventDefault={submit}>
    <CardNumber bind:element={cardElement}/>
    <CardExpiry />
    <CardCvc />

    <button>Pay</button>
  </form>
</Container>
```

When the form submits, pass the `cardElement` to [`stripe.confirmCardPayment()`](https://stripe.com/docs/js/payment_intents/confirm_card_payment), ie:

```javascript
const result = await stripe
  .confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: {
        ...
      }
    }
  })
```

[code](https://github.com/joshnuss/svelte-stripe-js/tree/main/src/routes/examples/credit-card)
[demo](/examples/credit-card)

#### GooglePay & ApplePay

To display a GooglePay or ApplePay button, use the `<PaymentRequestButton/>`.

```html
<Container {stripe}>
  <PaymentRequestButton {paymentRequest} on:paymentmethod={pay}/>
</Container>
```

It requires that you pass metadata using the `paymentRequest` prop:

```javascript
// declare payment metadata (amounts must match payment intent)
const paymentRequest = {
  country: 'US',
  currency: 'usd',
  total: {label: 'Demo total', amount: 1099},
  requestPayerName: true,
  requestPayerEmail: true,
}
```

And define an event handler for the `on:paymentmethod` event:

```javascript
async function pay(e) {
  const paymentMethod = e.detail.paymentMethod

  let result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod.id
  })

  if (result.error) {
    // mark failed
    e.detail.complete('fail')

    // payment failed, notify user
    error = result.error
  } else {
    // mark succeeded
    e.detail.complete('success')

    // payment succeeded, redirect to "thank you" page
    goto('/thanks')
  }
}
```

[code](https://github.com/joshnuss/svelte-stripe-js/tree/main/src/routes/examples/payment-request)
[demo](/examples/payment-request)

#### SEPA

To process SEPA debits, use the `<Iban>` component:

```html
<Container {stripe}>
  <form on:submit|preventDefault={submit}>
    <input name="name" bind:value={name} placeholder="Name"/>

    <!-- customize the list of countries, or use "SEPA" to allow all supported countries -->
    <Iban supportedCountries={['SEPA']} bind:element={ibanElement}/>

    <button>Pay</button>
  </form>
</Container>
```

To process the payment use [`stripe.confirmSepaDebitPayment()`](https://stripe.com/docs/js/payment_intents/confirm_sepa_debit_payment):

```javascript
const result = await stripe
  .confirmSepaDebitPayment(clientSecret, {
    payment_method: {
      sepa_debit: ibanElement,
      billing_details: {
        name,
        email
      }
    }
  })
```

[code](https://github.com/joshnuss/svelte-stripe-js/tree/main/src/routes/examples/sepa)
[demo](/examples/sepa)

#### iDEAL

To accept iDEAL payments, use the `<Ideal>` component:

```html
<Container {stripe}>
  <form on:submit|preventDefault={submit}>
    <input name="name" bind:value={name} placeholder="Name"/>
    <input name="email" bind:value={email} placeholder="E-mail" type='email'/>
    <Ideal bind:element={idealElement}/>

    <button>Pay</button>
  </form>
</Container>
```

To complete the payment call [`stripe.confirmIdealPayment()`](https://stripe.com/docs/js/payment_intents/confirm_ideal_payment), and make sure the pass a `return_url`:

```javascript
const result = await stripe
  .confirmIdealPayment(clientSecret, {
    payment_method: {
      ideal: idealElement,
      billing_details: {
        name,
        email
      }
    },
    return_url: `${window.location.origin}/return`
  })
```

[code](https://github.com/joshnuss/svelte-stripe-js/tree/main/src/routes/examples/ideal)
[demo](/examples/ideal)

### Receiving Webhooks

After the payment succeeds or fails, Stripe will send a webhook, it can be used to provision the fulfillment.

TODO

## Styling

TODO

## Examples

All demos are running in test-mode, any of Stripe's [test card numbers](https://stripe.com/docs/testing#cards) will work.

- [Credit Card](/examples/credit-card)
- [Google Pay/Apple Pay](/examples/payment-request)
- [SEPA](/examples/sepa)
- [iDEAL](/examples/ideal)
