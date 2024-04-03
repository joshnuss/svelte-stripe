import { c as create_ssr_component, o as onDestroy, d as add_attribute, v as validate_component } from "../../../../chunks/index2.js";
import "@stripe/stripe-js";
import { r as register } from "../../../../chunks/util.js";
const EmbeddedCheckout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stripe } = $$props;
  let { clientSecret } = $$props;
  let wrapper;
  let checkoutElement;
  onDestroy(() => {
    checkoutElement?.destroy();
  });
  if ($$props.stripe === void 0 && $$bindings.stripe && stripe !== void 0)
    $$bindings.stripe(stripe);
  if ($$props.clientSecret === void 0 && $$bindings.clientSecret && clientSecret !== void 0)
    $$bindings.clientSecret(clientSecret);
  {
    if (stripe) {
      register(stripe);
    }
  }
  {
    if (stripe && clientSecret && wrapper) {
      stripe.initEmbeddedCheckout({ clientSecret }).then((element) => {
        checkoutElement = element;
        checkoutElement.mount(wrapper);
      });
    }
  }
  return `${stripe && clientSecret ? `<div${add_attribute("this", wrapper, 0)}></div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let stripe = null;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1>Embedded Checkout Example</h1>

<nav><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/embedded-checkout">View code</a></nav>

${validate_component(EmbeddedCheckout, "EmbeddedCheckout").$$render($$result, { stripe, clientSecret: data.clientSecret }, {}, {})}`;
});
export {
  Page as default
};
