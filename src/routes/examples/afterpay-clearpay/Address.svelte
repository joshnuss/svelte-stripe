<script>
  let { legend, address = $bindable(), children } = $props();
</script>

<fieldset>
  <legend>{legend}</legend>

  {@render children?.()}

  <label for="line1"> Line 1 </label>
  <input id="line1" bind:value={address.line1} required />

  <label for="line2"> Line 2 </label>
  <input id="line2" bind:value={address.line2} />

  <label for="city"> City </label>
  <input id="city" bind:value={address.city} />

  <label for="state"> State </label>
  <input id="state" bind:value={address.state} />

  <label for="postal_code"> Postal code </label>
  <input id="postal_code" bind:value={address.postal_code} />

  <label for="country"> Country </label>
  <select id="country" bind:value={address.country}>
    <option value="AU">Australia</option>
    <option value="CA">Canada</option>
    <option value="NZ">New Zealand</option>
    <option value="UK">United Kingdom</option>
    <option value="US">United States</option>
  </select>
</fieldset>

<style>
  fieldset {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 2px solid var(--link-color);
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
    padding: 3rem;
    margin-bottom: 2rem;
  }
</style>
