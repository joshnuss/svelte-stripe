<svelte:head>
  <title>svelte-stripe</title>
  <meta name="keywords" content="svelte,stripe,credit,debit,card,payment,applepay,googlepay,sepa,ideal">
  <meta name="description" content="Everything you need to access Stripe payments with Svelte">
</svelte:head>

# svelte-stripe

Everything you need to add [Stripe Elements](https://stripe.com/en-gb-us/payments/elements) to your [Svelte](https://svelte.dev) & [SvelteKit](https://kit.svelte.dev) projects.

Links:
[npm](https://npmjs.org/package/svelte-stripe)
[github](https://github.com/joshnuss/svelte-stripe)
[changelog](https://github.com/joshnuss/svelte-stripe/blob/main/CHANGELOG.md)
[license](https://github.com/joshnuss/svelte-stripe/blob/main/LICENSE)

## Installation

To configure your project, add these 2 packages:

```bash
pnpm install -D stripe svelte-stripe
```

- [stripe](https://npmjs.org/package/stripe) is the official server-side version of Stripe.
- [svelte-stripe](https://npmjs.org/package/svelte-stripe) is the community-supported wrapper for Stripe Elements.

## Docs

### Set up Stripe

Add your private and public keys to your environment:

```bash
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

In your payment page, initialize Stripe and add a `<Elements>` component:

```html
<script>
  import { loadStripe } from '@stripe/stripe-js'
  import { Elements } from  'svelte-stripe'
  import { onMount } from 'svelte';

  let stripe = null

  onMount(async () => {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  })
</script>

{#if stripe}
  <Elements {stripe}>
    <!-- this is where your Stripe components go -->
  </Elements>
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
export async function POST() {
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

#### Payment Element

An all-in-one component that supports credit cards, SEPA, GooglePay and ApplePay.

To use it, drop a `<PaymentElement>` component in your form:

```html
<form on:submit|preventDefault={submit}>
  <Elements {stripe} {clientSecret} bind:elements>
    <PaymentElement/>
  </Elements>

  <button>Pay</button>
</form>
```

Then when creating the payment intent, enable the `automatic_payment_methods:` option:

```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'eur',
  automatic_payment_methods: {
    enabled: true,
  }
})
```

Once the form is submitted, call [`stripe.confirmPayment()`](https://stripe.com/docs/js/payment_intents/confirm_payment)

```javascript
const result = await stripe
  .confirmPayment({
    elements,
    // specify redirect: 'if_required' or a `return_url`
    redirect: 'if_required'
  })
```

[code](https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-element)
[demo](/examples/payment-element)

#### Link Authentication

With [Link](https://link.co), customer's don't have to re-enter payment and address details for each purchase. Their details are retreived based on their e-mail address.

Once they enter their e-mail they receive an SMS code to verify their identity.

It works in conjuction with `<PaymentElement>`:

```html
<form on:submit|preventDefault={submit}>
  <Elements {stripe} {clientSecret} bind:elements>
    <LinkAuthenticationElement/>
    <PaymentElement/>
  </Elements>

  <button>Pay</button>
</form>
```

[code](https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-element)
[demo](/examples/payment-element)

#### Credit Cards

These use the `<CardNumber>`, `<CardExpiry>` and `<CardCvc>` components:

```html
<Elements {stripe}>
  <form on:submit|preventDefault={submit}>
    <CardNumber bind:element={cardElement}/>
    <CardExpiry />
    <CardCvc />

    <button>Pay</button>
  </form>
</Elements>
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

[code](https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/credit-card)
[demo](/examples/credit-card)

#### GooglePay & ApplePay

To display a GooglePay or ApplePay button, use the `<PaymentRequestButton/>`.

```html
<Elements {stripe}>
  <PaymentRequestButton {paymentRequest} on:paymentmethod={pay}/>
</Elements>
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

[code](https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-request)
[demo](/examples/payment-request)

#### SEPA

To process SEPA debits, use the `<Iban>` component:

```html
<Elements {stripe}>
  <form on:submit|preventDefault={submit}>
    <input name="name" bind:value={name} placeholder="Name"/>

    <!-- customize the list of countries, or use "SEPA" to allow all supported countries -->
    <Iban supportedCountries={['SEPA']} bind:element={ibanElement}/>

    <button>Pay</button>
  </form>
</Elements>
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

[code](https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/sepa)
[demo](/examples/sepa)

#### iDEAL

To accept iDEAL payments, use the `<Ideal>` component:

```html
<Elements {stripe}>
  <form on:submit|preventDefault={submit}>
    <input name="name" bind:value={name} placeholder="Name"/>
    <input name="email" bind:value={email} placeholder="E-mail" type='email'/>
    <Ideal bind:element={idealElement}/>

    <button>Pay</button>
  </form>
</Elements>
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

[code](https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/ideal)
[demo](/examples/ideal)

### Webhooks

After the payment succeeds or fails, Stripe will send out a webhook, which can be used to provision or fulfill the purchase.

The webhook payload contains a signature that should be verified to ensure the data originated from Stripe.

Here's an example of handling a `charge.succeeded` webhook with SvelteKit:

```javascript
// in src/routes/stripe/webhooks.js
import Stripe from 'stripe'

// init api client
const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'])

// get webhook secret
// find yours at https://dashboard.stripe.com/webhooks
const endpointSecret = process.env['STRIPE_WEBHOOK_SECRET']

// endpoint to handle incoming webhooks
export async function POST({ request }) {
  // extract body
  const body = await request.text()

  // get the signature from the header
  const signature = request.headers.get('stripe-signature')

  // var to hold event data
  let event

  // verify it
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    // signature is invalid!
    console.warn('⚠️  Webhook signature verification failed.', err.message)

    // return, because it's a bad request
    return { status: 400 }
  }

  // signature has been verified, so we can process events
  // full list of events: https://stripe.com/docs/api/events/list
  if (event.type == 'charge.succeeded') {
    // get data object
    const charge = event.data.object

    // TODO: fulfill the order here
    console.log(`✅ Charge succeeded ${charge.id}`)
  }

  // return status 200
  return {}
}
```

[code](https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/credit-card/webhooks.js)

In development mode, webhooks can be routed to your dev machine using [Stripe's CLI](https://stripe.com/docs/stripe-cli). Example:

```bash
stripe listen --forward-to localhost:3000/stripe/webhooks
```

For more information on webhooks, see [Stripe's Webhook Docs](https://stripe.com/docs/webhooks).

## Styling

TODO

## Examples

All demos are running in test-mode, any of Stripe's [test card numbers](https://stripe.com/docs/testing#cards) will work.

- [PaymentElement](/examples/payment-element)
- [Credit Card](/examples/credit-card)
- [Apple Pay](/examples/payment-request)
- [Google Pay](/examples/payment-request)
- [Microsoft Pay](/examples/payment-request)
- [SEPA](/examples/sepa)
- [iDEAL](/examples/ideal)
- [Alipay](/examples/alipay)
- [WeChat Pay](/examples/wechat-pay)
- [Konbini](/examples/konbini)
- [Klarna](/examples/klarna)
- [Sofort](/examples/sofort)
- [Afterpay/Clearpay](/examples/afterpay-clearpay)

## Sponsors

This project is made possible by:

<a href="https://stripe.com">
  <img src="/logos/stripe.svg" width=250 alt="Stripe's logo"/>
</a>
