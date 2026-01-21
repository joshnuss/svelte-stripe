<script lang="ts">
  import type {
    StripeCardExpiryElementOptions as Options,
    StripeCardExpiryElement as Element,
    StripeCardExpiryElementChangeEvent as ChangeEvent,
    StripeError
  } from '@stripe/stripe-js'
  import type { ElementsContext } from './d.ts'
  import { getContext, onMount } from 'svelte'

  type Events = {
    onchange?: (event: ChangeEvent) => any
    onready?: (event: { elementType: 'cardExpiry' }) => any
    onfocus?: (event: { elementType: 'cardExpiry' }) => any
    onblur?: (event: { elementType: 'cardExpiry' }) => any
    onescape?: (event: { elementType: 'cardExpiry' }) => any
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
    element = elements.create('cardExpiry', options)

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
