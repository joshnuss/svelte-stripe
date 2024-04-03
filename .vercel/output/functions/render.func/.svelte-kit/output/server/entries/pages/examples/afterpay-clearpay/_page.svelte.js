import { c as create_ssr_component, e as escape, d as add_attribute, v as validate_component } from "../../../../chunks/index2.js";
import "@stripe/stripe-js";
const Address_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "fieldset.svelte-13dsafx{display:flex;flex-direction:column;gap:1rem;border:2px solid var(--link-color);-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px;padding:3rem;margin-bottom:2rem}",
  map: null
};
const Address = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { legend } = $$props;
  let { address } = $$props;
  if ($$props.legend === void 0 && $$bindings.legend && legend !== void 0)
    $$bindings.legend(legend);
  if ($$props.address === void 0 && $$bindings.address && address !== void 0)
    $$bindings.address(address);
  $$result.css.add(css$1);
  return `<fieldset class="svelte-13dsafx"><legend>${escape(legend)}</legend>

  ${slots.default ? slots.default({}) : ``}

  <label for="line1">Line 1 </label>
  <input id="line1" required${add_attribute("value", address.line1, 0)}>

  <label for="line2">Line 2 </label>
  <input id="line2"${add_attribute("value", address.line2, 0)}>

  <label for="city">City </label>
  <input id="city"${add_attribute("value", address.city, 0)}>

  <label for="state">State </label>
  <input id="state"${add_attribute("value", address.state, 0)}>

  <label for="postal_code">Postal code </label>
  <input id="postal_code"${add_attribute("value", address.postal_code, 0)}>

  <label for="country">Country </label>
  <select id="country"><option value="AU">Australia</option><option value="CA">Canada</option><option value="NZ">New Zealand</option><option value="UK">United Kingdom</option><option value="US">United States</option></select>
</fieldset>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".error.svelte-15xrav7{color:tomato;margin:2rem 0 0}form.svelte-15xrav7{display:flex;flex-direction:column;gap:10px;margin:2rem 0}form.svelte-15xrav7 input,.input,form.svelte-15xrav7 select{border:solid 1px var(--gray-color);padding:1rem;border-radius:5px;background:white}button.svelte-15xrav7{padding:1rem;border-radius:5px;border:solid 1px #ccc;color:white;background:var(--link-color);font-size:1.2rem;margin:1rem 0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "jsmith@example.com";
  let name = "John Smith";
  let billingAddress = {
    line1: "123 Main",
    line2: "Apt 100",
    state: "CA",
    city: "Los Angeles",
    country: "US",
    postal_code: "1000"
  };
  let shippingAddress = {
    line1: "123 Main",
    line2: "Apt 100",
    state: "CA",
    city: "Los Angeles",
    country: "US",
    postal_code: "1000"
  };
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h1>Afterpay/Clearpay Example</h1>

<nav><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/afterpay-clearpay">View code</a></nav>

${``}

<form class="svelte-15xrav7">${validate_component(Address, "Address").$$render(
      $$result,
      {
        legend: "Billing",
        address: billingAddress
      },
      {
        address: ($$value) => {
          billingAddress = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<label for="name">Name </label>
    <input id="name" required${add_attribute("value", name, 0)}>
    <label for="email">Email </label>
    <input type="email" id="email" required${add_attribute("value", email, 0)}>`;
        }
      }
    )}

  ${validate_component(Address, "Address").$$render(
      $$result,
      {
        legend: "Shipping",
        address: shippingAddress
      },
      {
        address: ($$value) => {
          shippingAddress = $$value;
          $$settled = false;
        }
      },
      {}
    )}

  <button ${""} class="svelte-15xrav7">${`Pay with Afterpay/Clearpay`}</button>
</form>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
