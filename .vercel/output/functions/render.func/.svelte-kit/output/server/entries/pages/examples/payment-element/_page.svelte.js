import { c as create_ssr_component } from "../../../../chunks/index2.js";
import "@stripe/stripe-js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".error.svelte-y4pdr7{color:tomato;margin:2rem 0 0}form.svelte-y4pdr7{display:flex;flex-direction:column;gap:10px;margin:2rem 0}button.svelte-y4pdr7{padding:1rem;border-radius:5px;border:solid 1px #ccc;color:white;background:var(--link-color);font-size:1.2rem;margin:1rem 0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h1>Payment Element Example</h1>

<nav><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-element">View code</a></nav>

${``}

${`Loading...`}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
