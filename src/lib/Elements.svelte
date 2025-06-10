<script lang="ts">
  import { setContext, onMount, type Snippet } from 'svelte'
  import { isServer, register } from './util.js'
  import type {
    Stripe,
    StripeElements,
    Appearance,
    StripeElementsOptions as Options,
    StripeElementsOptionsMode as OptionsMode
  } from '@stripe/stripe-js'

  interface Props {
    stripe: Stripe
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

  onMount(() => {
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
  })

  $effect(() => {
    elements?.update({ appearance, locale })
  })
</script>

{#if elements && children}
  {@render children()}
{/if}
