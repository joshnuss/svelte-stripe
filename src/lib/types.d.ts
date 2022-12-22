import type { StripeElements, Stripe } from '@stripe/stripe-js'

interface ElementsContext {
  elements: StripeElements
  stripe: Stripe
}
