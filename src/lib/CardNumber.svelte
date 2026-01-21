<script lang="ts">
  import type {
    StripeCardNumberElementOptions as Options,
    StripeCardNumberElementChangeEvent as ChangeEvent,
    StripeCardNumberElement as Element,
    StripeError
  } from '@stripe/stripe-js'
  import type { ElementsContext } from './d.ts'
  import { getContext, onMount } from 'svelte'

  type Events = {
    onchange?: (event: ChangeEvent) => any
    onready?: (event: { elementType: 'cardNumber' }) => any
    onfocus?: (event: { elementType: 'cardNumber' }) => any
    onblur?: (event: { elementType: 'cardNumber' }) => any
    onescape?: (event: { elementType: 'cardNumber' }) => any
  }

  type Bindables = {
    element?: Element
  }

  type Props = Options & Events & Bindables

  let {
    element = $bindable(),
    onchange = () => {},
    onready = () => {},
    onfocus = () => {},
    onblur = () => {},
    onescape = () => {},
    ...options
  }: Props = $props()

  let wrapper = $state<HTMLElement>()

  const { elements }: ElementsContext = getContext('stripe')

  onMount(() => {
    element = elements.create('cardNumber', options)

    element.on('change', onchange)
    element.on('ready', onready)
    element.on('focus', onfocus)
    element.on('blur', onblur)
    element.on('escape', onescape)

    element.mount(wrapper!)

    return () => element?.destroy()
  })

  $effect(() => {
    element?.update(options)
  })

  export function blur() {
    element?.blur()
  }

  export function clear() {
    element?.clear()
  }

  export function destroy() {
    element?.destroy()
  }

  export function focus() {
    element?.focus()
  }
</script>

<div bind:this={wrapper}></div>

<style>
  div {
    display: contents;
  }
</style>
