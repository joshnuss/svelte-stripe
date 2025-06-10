<script lang="ts">
  import type {
    StripeElementClasses as Classes,
    StripeElementStyle as Style,
    StripeIbanElement as Element,
    StripeIbanElementChangeEvent as ChangeEvent
  } from '@stripe/stripe-js'
  import { getContext, onMount } from 'svelte'
  import type { ElementsContext } from './d.ts'

  interface Props {
    classes?: Classes
    style?: Style
    supportedCountries?: string[]
    placeholderCountry?: string
    hideIcon?: boolean
    iconStyle?: 'default' | 'solid'
    disabled?: boolean
    element?: Element
    onchange?: (event: ChangeEvent) => any
    onready?: (event: { elementType: 'iban' }) => any
    onfocus?: (event: { elementType: 'iban' }) => any
    onblur?: (event: { elementType: 'iban' }) => any
    onescape?: (event: { elementType: 'iban' }) => any
  }

  let {
    classes = {},
    style = {},
    supportedCountries = [],
    placeholderCountry = '',
    hideIcon = false,
    iconStyle = 'default',
    disabled = false,
    element = $bindable(),
    onchange = () => {},
    onready = () => {},
    onfocus = () => {},
    onblur = () => {},
    onescape = () => {}
  }: Props = $props()

  let wrapper = $state<HTMLElement>()

  const { elements }: ElementsContext = getContext('stripe')

  onMount(() => {
    const options = {
      classes,
      style,
      supportedCountries,
      placeholderCountry,
      disabled,
      hideIcon,
      iconStyle
    }

    element = elements.create('iban', options)
    element.on('change', onchange)
    element.on('ready', onready)
    element.on('focus', onfocus)
    element.on('blur', onblur)
    element.on('escape', onescape)

    element.mount(wrapper!)

    return () => element?.destroy()
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
