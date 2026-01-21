# Changelog

## 1.0.0

- Removed deprecated `<Container/>` component. Use `<Elements/>` instead.
- Removed `<PaymentRequestButton/>`, use `<ExpressCheckout>` instead.
- `<Elements/>` now requires some options to be wrapped in an `appearance` attribute.
- `<Element/>` component now requires a `stripe` prop. It's not optional anymore.

## 0.0.23

- Added `options` to `<PaymentElement/>`
- Added `<PaymentMethodMessaging/>` component

## 0.0.22

- Added `font` option to `<Elements/>`
- Allow changing appearance of `<Elements/>`
- Added support for re-mounting components
- Added `locale` option to `<Elements/>`

## 0.0.21

- Bumped `stripe-js` dep to `1.46`
- Migrated to SvelteKit `1.0`

## 0.0.20

- Added `<Address>` element. See: https://stripe.com/docs/js/elements_object/create_address_element

## 0.0.19

- Added `<LinkAuthenticationElement>`, see: https://stripe.com/docs/payments/link/accept-a-payment
- Makes `@stripe/stripe-js` npm package a dependency.

## 0.0.18

- Deprecated `<Container/>`, replaced by `<Elements/>`
- Added example for Konbini
- Added example for WeChat Pay
- Added example for Alipay

## 0.0.17

- Added jsdoc support
- Bump to SvelteKit next.299
- Added examples and docs for receiving webhooks

## 0.0.13

- Renamed `svelte-stripe-js` to `svelte-stripe`
