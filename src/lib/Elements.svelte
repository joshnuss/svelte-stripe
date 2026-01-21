<script lang="ts">
  import { setContext, onMount, type Snippet } from 'svelte'
  import { register } from './util.js'
  import type {
    Stripe,
    StripeElements,
    StripeElementsOptions as Options
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
    ...options
  }: Props = $props()

  onMount(() => {
    // @ts-expect-error
    elements = stripe.elements(options)

    elements.on('update-end', onupdateend)

    register(stripe)
  })

  $effect(() => {
    elements?.update(options)
  })

  setContext('stripe', {
    get stripe() {
      return stripe
    },
    get elements() {
      return elements
    }
  })
</script>

{#if elements && children}
  {@render children()}
{/if}
