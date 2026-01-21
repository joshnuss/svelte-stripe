<script lang="ts">
  import { setContext, onMount, type Snippet } from 'svelte'
  import { register } from './util.js'
  import type {
    Stripe,
    StripeElements,
    StripeElementsOptions as Options,
    StripeElementsOptionsMode as OptionsMode
  } from '@stripe/stripe-js'

  type Base = {
    stripe: Stripe
    children: Snippet
  }

  type Events = {
    onupdateend?: () => any
  }

  type Bindables = {
    elements?: StripeElements
  }

  type Props = Base & Options & Events & Bindables

  let {
    stripe,
    elements = $bindable(),
    children,
    onupdateend = () => {},
    mode = 'payment',
    ...options
  }: Props = $props()

  onMount(() => {
    elements = stripe.elements(options)

    elements.on('update-end', onupdateend)

    register(stripe)
    setContext('stripe', { stripe, elements })
  })

  $effect(() => {
    elements?.update(options)
  })
</script>

{#if elements && children}
  {@render children()}
{/if}
