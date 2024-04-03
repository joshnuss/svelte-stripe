import { c as create_ssr_component, d as add_attribute } from "../../../../chunks/index2.js";
import "@stripe/stripe-js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".error.svelte-4i9m9b{color:tomato;margin:2rem 0 0}form.svelte-4i9m9b{display:flex;flex-direction:column;gap:10px;margin:2rem 0}input.svelte-4i9m9b,.input{border:solid 1px var(--gray-color);padding:1rem;border-radius:5px;background:white}button.svelte-4i9m9b{padding:1rem;border-radius:5px;border:solid 1px #ccc;color:white;background:var(--link-color);font-size:1.2rem;margin:1rem 0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email;
  let name;
  let phone;
  $$result.css.add(css);
  return `<h1>Konbini Example</h1>

<nav><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/konbini">View code</a></nav>

${``}

<form class="svelte-4i9m9b"><input name="name" placeholder="Name" type="text" required ${""} class="svelte-4i9m9b"${add_attribute("value", name, 0)}>
  <input name="email" placeholder="E-mail" type="email" required ${""} class="svelte-4i9m9b"${add_attribute("value", email, 0)}>
  <input name="phone" placeholder="Phone" type="tel" required ${""} class="svelte-4i9m9b"${add_attribute("value", phone, 0)}>

  <button ${""} class="svelte-4i9m9b">${`Pay with Konbini`}</button>
</form>`;
});
export {
  Page as default
};
