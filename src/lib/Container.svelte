<script>
  import { setContext } from 'svelte'

  export let stripe

  const elements = stripe.elements()

  setContext('stripe', {stripe, elements})

  export function getElement() {
    return elements.getElement('cardNumber')
  }
</script>

<slot/>
