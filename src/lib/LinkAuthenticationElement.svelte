<script lang="ts">
  import type {
    StripeLinkAuthenticationElement as Element,
    StripeLinkAuthenticationElementOptions as Options,
    StripeLinkAuthenticationElementChangeEvent as ChangeEvent
  } from '@stripe/stripe-js'
  import { getContext, onMount } from 'svelte'
  import type { ElementsContext } from './d.ts'

  interface Props {
    defaultValues?: Options['defaultValues']
    element?: Element
    onchange?: (event: ChangeEvent) => any
    onready?: (event: { elementType: 'linkAuthentication' }) => any
    onfocus?: (event: { elementType: 'linkAuthentication' }) => any
    onblur?: (event: { elementType: 'linkAuthentication' }) => any
    onescape?: (event: { elementType: 'linkAuthentication' }) => any
    onloaderror?: (event: { elementType: 'linkAuthentication' }) => any
    onloaderstart?: (event: { elementType: 'linkAuthentication' }) => any
  }

  let {
    defaultValues,
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
    const options = defaultValues ? { defaultValues } : {}

    element = elements.create('linkAuthentication', options)

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
