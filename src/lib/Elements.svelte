<script lang="ts">
  import { setContext } from 'svelte'
  import { isServer, register } from './util.js'
  import type { Snippet } from 'svelte'
  import type { Stripe, StripeElements, Appearance, StripeElementsOptions as Options, StripeElementsOptionsMode as OptionsMode } from '@stripe/stripe-js'

  interface Props {
    stripe?: Stripe | null
    mode?: OptionsMode['mode']
    theme?: Appearance['theme']
    variables?: Appearance['variables']
    rules?: Appearance['rules']
    labels?: Appearance['labels']
    loader?: Options['loader']
    fonts?: Options['fonts']
    locale?: Options['locale']
    currency?: OptionsMode['currency']
    amount?: OptionsMode['amount']
    clientSecret?: string
    elements?: StripeElements
    children: Snippet
  }

  let {
    stripe,
    mode,
    theme = 'stripe',
    variables = {},
    rules = {},
    labels = 'above',
    loader = 'auto',
    fonts = [],
    locale = 'auto',
    currency,
    amount,
    clientSecret,
    elements = $bindable(),
    children
  }: Props = $props()

  let appearance = $derived({
    theme,
    variables,
    rules,
    labels
  })

  $effect(() => {
    if (stripe && !elements) {
      elements = stripe.elements({
        mode,
        currency,
        amount,
        appearance,
        clientSecret,
        fonts,
        loader,
        locale
      })

      register(stripe)
      setContext('stripe', { stripe, elements })
    }
  })

  $effect(() => {
    if (elements) {
      elements.update({ appearance, locale })
    }
  })
</script>

{#if stripe && elements}
  {@render children?.()}
{/if}
