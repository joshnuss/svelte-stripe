<script>
  import { setContext } from 'svelte'
  import { isServer, register } from './util'

  export let stripe

  const elements = isServer ? null : stripe.elements()

  register(stripe)
  setContext('stripe', { stripe, elements })
</script>

<slot />
