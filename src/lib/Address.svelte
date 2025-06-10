<script lang="ts">
  import type {
    StripeAddressElement as Element,
    StripeAddressElementOptions as Options,
    StripeAddressElementChangeEvent as ChangeEvent,
    StripeError
  } from '@stripe/stripe-js'
  import { getContext, onMount } from 'svelte'
  import type { ElementsContext } from './d.ts'

  interface Props {
    mode: Options['mode']
    allowedCountries?: Options['allowedCountries']
    autocomplete?: Options['autocomplete']
    blockPoBox?: Options['blockPoBox']
    contacts?: Options['contacts']
    defaultValues?: Options['defaultValues']
    fields?: Options['fields']
    validation?: Options['validation']
    display?: Options['display']
    element?: Element
    onchange?: (event: ChangeEvent) => any
    onready?: (event: { elementType: 'address' }) => any
    onfocus?: (event: { elementType: 'address' }) => any
    onblur?: (event: { elementType: 'address' }) => any
    onescape?: (event: { elementType: 'address' }) => any
    onloaderror?: (event: { elementType: 'address'; error: StripeError }) => any
    onloaderstart?: (event: { elementType: 'address' }) => any
  }

  let {
    mode,
    allowedCountries = undefined,
    autocomplete = { mode: 'automatic' },
    blockPoBox = undefined,
    contacts = undefined,
    defaultValues = undefined,
    fields = undefined,
    validation = undefined,
    display = undefined,
    element = $bindable(),
    onchange = () => {},
    onready = () => {},
    onfocus = () => {},
    onblur = () => {},
    onescape = () => {},
    onloaderror = () => {},
    onloaderstart = () => {}
  }: Props = $props()

  let wrapper = $state<HTMLElement>()

  const { elements }: ElementsContext = getContext('stripe')

  onMount(() => {
    const options = {
      mode,
      allowedCountries,
      autocomplete,
      blockPoBox,
      contacts,
      defaultValues,
      fields,
      validation,
      display
    }

    element = elements.create('address', options)

    element.on('change', onchange)
    element.on('ready', onready)
    element.on('focus', onfocus)
    element.on('blur', onblur)
    element.on('escape', onescape)
    element.on('loaderror', onloaderror)
    element.on('loaderstart', onloaderstart)

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
