# [svelte-stripe-js](https://svelte-stripe-js.vercel.app)

Everything you need to add Stripe to your Svelte project. 100% [svelte-kit](https://kit.svelte.dev/) compatible.

> Stripe is now [sponsoring this project](#sponsors)

[Documentation](https://svelte-stripe-js.vercel.app)

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
- `<PaymentElement/>`: All-in-one component that allows the user to choose the type of payment.

## Supported payment types

- Credit card
- GooglePay
- ApplePay
- SEPA direct deposit
- iDEAL

Please open a PR or issue, if you'd like to add more.

## Usage

See [documentation](https://svelte-stripe-js.vercel.app/) for setup instructions and examples.

## Sponsors

<a href="https://stripe.com">
  <img src="https://raw.githubusercontent.com/joshnuss/svelte-stripe-js/main/static/logos/stripe.svg" width="150px"/>
</a>

## Code contributors

![GitHub Contributors Image](https://contrib.rocks/image?repo=joshnuss/svelte-stripe-js)

## License

MIT
