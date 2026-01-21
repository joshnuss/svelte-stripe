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

To configure your project, add these 3 packages:

```bash
pnpm install -D stripe @stripe/stripe-js svelte-stripe
```

- [stripe](https://npmjs.org/package/stripe) is Stripe's official server-side library.
- [@stripe/stripe-js](https://www.npmjs.com/package/@stripe/stripe-js) is Stripe's official client-side library.
- [svelte-stripe](https://npmjs.org/package/svelte-stripe) is the community-supported wrapper for Stripe Elements.

## Docs

### Set up Stripe

Add your private and public keys to your environment:

```bash
PUBLIC_STRIPE_KEY=pk_test_...
SECRET_STRIPE_KEY=sk_test_...
```

In your payment page, initialize Stripe and add a `<Elements>` component:

```svelte
<script lang="ts">
  import { loadStripe } from '@stripe/stripe-js'
  import { Elements } from 'svelte-stripe'
  import { onMount } from 'svelte'
  import { PUBLIC_STRIPE_KEY } from '$env/static/public'

  let stripe = null

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY)
  })
</script>

<Elements {stripe}>
  <!-- this is where your Stripe components go -->
</Elements>
```

### Creating a payment intent

Before making a charge, Stripe should be notified by creating a [payment intent](https://stripe.com/docs/api/payment_intents). It's a way to tell Stripe what amount to capture and to attach any relavent metadata, for example, the products they are buying. This must happen server-side to avoid anyone tampering with the amount.

Let's add an endpoint `src/routes/create-payment-intent/+server.js` to create the "payment intent":

```javascript
import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'

// initialize Stripe
const stripe = new Stripe(SECRET_STRIPE_KEY)

// handle POST /create-payment-intent
export async function POST() {
  // create the payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    // note, for some EU-only payment methods it must be EUR
    currency: 'usd',
    // specify what payment methods are allowed
    // can be card, sepa_debit, ideal, etc...
    payment_method_types: ['card']
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

```svelte
<form onsubmit={submit}>
  <Elements {stripe} {clientSecret} bind:elements>
    <PaymentElement options="{...}" />
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
    enabled: true
  }
})
```

Once the form is submitted, call [`stripe.confirmPayment()`](https://stripe.com/docs/js/payment_intents/confirm_payment)

```javascript
const result = await stripe.confirmPayment({
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

```svelte
<form onsubmit={submit}>
  <Elements {stripe} {clientSecret} bind:elements>
    <LinkAuthenticationElement />
    <PaymentElement />
  </Elements>

  <button>Pay</button>
</form>
```

[code](https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-element)
[demo](/examples/payment-element)

#### Credit Cards

These use the `<CardNumber>`, `<CardExpiry>` and `<CardCvc>` components:

```svelte
<Elements {stripe}>
  <form onsubmit={submit}>
    <CardNumber bind:element={cardElement} />
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

To display a GooglePay or ApplePay button, use the `<ExpressCheckout/>`.

```svelte
<Elements {stripe} mode="payment" currency="usd" amount={1099} bind:elements>
  <ExpressCheckout
    onclick={click}
    onconfirm={confirm}
    buttonHeight={50}
    buttonTheme={{ googlePay: 'white' }}
    buttonType={{ googlePay: 'donate' }}
    paymentMethodOrder={['googlePay', 'link']}
  />
</Elements>
```

Handle the `onclick` event to add line items:

```javascript
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

  event.resolve(options)
}
```

Then handle the `onconfirm` event to complete the payment:

```javascript
async function confirm(event) {
  let result = await elements.submit()

  if (result.error) {
    // validation failed, notify user
    error = result.error
    return
  }

  // create payment intent server side
  const clientSecret = await createPaymentIntent()
  const return_url = new URL('/examples/thanks', window.location.origin).toString()

  // confirm payment with stripe
  result = await stripe.confirmPayment({
    elements,
    clientSecret,
    confirmParams: {
      return_url
    }
  })

  if (result.error) {
    // payment failed, notify user
    error = result.error
  } else {
    // payment succeeded, redirect to "thank you" page
    goto('/thanks')
  }
}
```

[code](https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/express-checkout)
[demo](/examples/express-checkout)

#### SEPA

To process SEPA debits, use the `<Iban>` component:

```svelte
<Elements {stripe}>
  <form onsubmit={submit}>
    <input name="name" bind:value={name} placeholder="Name" />

    <!-- customize the list of countries, or use "SEPA" to allow all supported countries -->
    <Iban supportedCountries={['SEPA']} bind:element={ibanElement} />

    <button>Pay</button>
  </form>
</Elements>
```

To process the payment use [`stripe.confirmSepaDebitPayment()`](https://stripe.com/docs/js/payment_intents/confirm_sepa_debit_payment):

```javascript
const result = await stripe.confirmSepaDebitPayment(clientSecret, {
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

```svelte
<Elements {stripe}>
  <form onsubmit={submit}>
    <input name="name" bind:value={name} placeholder="Name" />
    <input name="email" bind:value={email} placeholder="E-mail" type="email" />
    <Ideal bind:element={idealElement} />

    <button>Pay</button>
  </form>
</Elements>
```

To complete the payment call [`stripe.confirmIdealPayment()`](https://stripe.com/docs/js/payment_intents/confirm_ideal_payment), and make sure the pass a `return_url`:

```javascript
const result = await stripe.confirmIdealPayment(clientSecret, {
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
// in src/routes/stripe/webhooks/+server.js
import Stripe from 'stripe'
import { error, json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

// init api client
const stripe = new Stripe(env.SECRET_STRIPE_KEY)

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
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    // signature is invalid!
    console.warn('⚠️  Webhook signature verification failed.', err.message)

    // return, because it's a bad request
    throw error(400, 'Invalid request')
  }

  // signature has been verified, so we can process events
  // full list of events: https://stripe.com/docs/api/events/list
  if (event.type == 'charge.succeeded') {
    // get data object
    const charge = event.data.object

    // TODO: fulfill the order here
    console.log(`✅ Charge succeeded ${charge.id}`)
  }

  // return a 200 with an empty JSON response
  return json()
}
```

[code](https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/credit-card/webhooks.js)

In development mode, webhooks can be routed to your dev machine using [Stripe's CLI](https://stripe.com/docs/stripe-cli). Example:

```bash
stripe listen --forward-to localhost:5173/stripe/webhooks
```

For more information on webhooks, see [Stripe's Webhook Docs](https://stripe.com/docs/webhooks).

## Styling

Components can be styled by setting attributes on the `<Elements/>` container.

```svelte
<Elements
  theme="flat"
  labels="floating"
  variables={{ colorPrimary: 'pink' }}
  rules={...}
  />
```

See [appearance docs](https://stripe.com/docs/elements/appearance-api) for more examples.

## Examples

All demos are running in test-mode, any of Stripe's [test card numbers](https://stripe.com/docs/testing#cards) will work.

- [Payment Element](/examples/payment-element)
- [Express Checkout](/examples/express-checkout)
- [Embedded Checkout](/examples/embedded-checkout)
- [Credit Card](/examples/credit-card)
- [Apple Pay](/examples/express-checkout)
- [Google Pay](/examples/express-checkout)
- [Microsoft Pay](/examples/express-checkout)
- [SEPA](/examples/sepa)
- [iDEAL](/examples/ideal)
- [Alipay](/examples/alipay)
- [WeChat Pay](/examples/wechat-pay)
- [Konbini](/examples/konbini)
- [Klarna](/examples/klarna)
- [Sofort](/examples/sofort)
- [Afterpay/Clearpay](/examples/afterpay-clearpay)
- [PaymentMethodMessaging](/examples/payment-method-messaging)

## Sponsors

This project is made possible by:

<a href="https://stripe.com">
  <img src="/logos/stripe.svg" width=250 alt="Stripe's logo"/>
</a>
