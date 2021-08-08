# svelte-stripe-js

Everything you need to add Stripe to your Svelte project

## Creating a payment form

This package provides components:

- `Container`: A wrapper components that sets context.
- `CardNumber`: Input for the card's number.
- `CardExpiry`: Input for the card's expiration date.
- `CardCvc`: Input for Card Verification Value.
- `Card`: All-in-one component that has inputs for card number, expiry, cvc, and zip code.

## TODO

- [ ] Apple Pay
- [ ] Google Pay
- [ ] PaymentRequest
- [ ] SEPA
- [ ] iDEAL

## Usage

Install the package:

```bash
pnpm add -D svelte-stripe-js
```

In your main template, add include `stripe.js` from the CDN:

```html
<script src="https://js.stripe.com/v3/"></script>
```

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

<Container {stripe} bind:this="{container}">
  <form on:submit|preventDefault="{submit}">
    <CardNumber />
    <CardExpiry />
    <CardCvc />

    <button>Pay</button>
  </form>
</Container>
```

## License

MIT
