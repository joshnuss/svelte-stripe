<script>
  import { setContext } from 'svelte'

  export let stripe

  const elements = stripe.elements()

  setContext('stripe', { stripe, elements })

  export function getElement(name = 'cardNumber') {
    return elements.getElement(name)
  }
</script>

<slot />
