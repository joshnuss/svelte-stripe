<script>
  import { onMount } from 'svelte'

  let hosted_voucher_url

  onMount(() => {
    const searchParams = new URLSearchParams(window.location.search)
    hosted_voucher_url = searchParams.get('hosted_voucher_url')
  })
</script>

<h1>Next steps</h1>

<p>Follow <a href={hosted_voucher_url}>these instructions</a> to complete the Konbini payment.</p>
