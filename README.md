# [svelte-stripe](https://sveltestripe.com)

Everything you need to add Stripe Elements to your Svelte project. 100% [SvelteKit](https://kit.svelte.dev/) compatible.

> Stripe is now [sponsoring this project](#sponsors)

[Documentation](https://sveltestripe.com)

## Components

The following components are provided:

- `<Elements/>`: A wrapper component to set context.
- `<CardNumber/>`: Input field for the card's number.
- `<CardExpiry/>`: Input field for the card's expiration date.
- `<CardCvc/>`: Input field for Card Verification Value.
- `<Card/>`: All-in-one component that has inputs for card number, expiry, cvc, and zip code.
- `<PaymentRequestButton/>`: A GooglePay, ApplePay, or Link checkout button, depending on browser and user preferences.
- `<Iban/>`: Input field for IBAN (International bank account number).
- `<Ideal/>`: Input field for iDEAL (payment system used in the Netherlands).
- `<PaymentElement/>`: All-in-one component that allows the user to choose the type of payment.
- `<LinkAuthenticationElement/>`: Ability to use saved payment methods stored in [Link](https://link.co).
- `<Address/>`: Component for collecting billing and shipping addresses.

## Examples

There is example code for:

- [Payment Element](src/routes/examples/payment-element)
- [Link](src/routes/examples/payment-element)
- [Credit card](src/routes/examples/credit-card)
- [GooglePay](src/routes/examples/payment-request)
- [ApplePay](src/routes/examples/payment-request)
- [MicrosoftPay](src/routes/examples/payment-request)
- [SEPA direct deposit](src/routes/examples/sepa)
- [iDEAL](src/routes/examples/ideal)
- [Alipay](src/routes/examples/alipay)
- [WeChat Pay](src/routes/examples/wechat-pay)
- [Konbini](src/routes/examples/konbini)
- [Klarna](src/routes/examples/klarna)
- [Sofort](src/routes/examples/sofort)
- [Afterpay/Clearpay](src/routes/examples/afterpay-clearpay)
- [PaymentMethodMessaging](src/routes/examples/payment-method-messaging)

Please open a PR or issue, if you'd like to add more.

## Usage

See [documentation](https://sveltestripe.com) for setup instructions and examples.

## Sponsors

<a href="https://stripe.com">
  <img src="https://raw.githubusercontent.com/joshnuss/svelte-stripe/main/static/logos/stripe.svg" width="150px" alt="Stripe's logo"/>
</a>

## Code contributors

![GitHub Contributors Image](https://contrib.rocks/image?repo=joshnuss/svelte-stripe)

## Development mode

Run `pnpm dev` and visit `https://localhost:5173`:

```bash
pnpm dev
```

## License

MIT
