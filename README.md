# [svelte-stripe](https://sveltestripe.com)

Everything you need to add Stripe to your Svelte project. 100% [svelte-kit](https://kit.svelte.dev/) compatible.

> Stripe is now [sponsoring this project](#sponsors)

[Documentation](https://sveltestripe.com)

## Components

The following components are provided:

- `<Container/>`: A wrapper component to set context.
- `<CardNumber/>`: Input field for the card's number.
- `<CardExpiry/>`: Input field for the card's expiration date.
- `<CardCvc/>`: Input field for Card Verification Value.
- `<Card/>`: All-in-one component that has inputs for card number, expiry, cvc, and zip code.
- `<PaymentRequestButton/>`: A GooglePay or ApplePay button, depending on browser.
- `<Iban/>`: Input field for IBAN (International bank account number).
- `<Ideal/>`: Input field for iDEAL (payment system used in the Netherlands).
- `<PaymentElement/>`: All-in-one component that allows the user to choose the type of payment.

## Examples

There is example code for:

- [Payment Element](src/routes/examples/payment-element)
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

Run `pnpm dev` with environment loaded, and visit `https://localhost:3000`:

```bash
npx dotenv -c development pnpm dev
```

## License

MIT
