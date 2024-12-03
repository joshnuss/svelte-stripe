import type { StripeElements, Stripe } from '@stripe/stripe-js'

export interface ElementsContext {
  elements: StripeElements
  stripe: Stripe
}
