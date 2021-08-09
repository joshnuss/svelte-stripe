<script>
  import { setContext } from 'svelte'
  import { isServer } from './util'

  export let stripe

  const elements = isServer ? null : stripe.elements()

  setContext('stripe', { stripe, elements })
</script>

<slot />
