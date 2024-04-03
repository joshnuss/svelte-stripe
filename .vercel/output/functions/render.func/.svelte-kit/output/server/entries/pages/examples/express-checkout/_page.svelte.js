import { c as create_ssr_component, f as createEventDispatcher, g as getContext, d as add_attribute, v as validate_component } from "../../../../chunks/index2.js";
import "@stripe/stripe-js";
import { E as Elements } from "../../../../chunks/Elements.js";
const ExpressCheckout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { buttonHeight = void 0 } = $$props;
  let { buttonTheme = void 0 } = $$props;
  let { buttonType = void 0 } = $$props;
  let { layout = void 0 } = $$props;
  let { paymentMethodOrder = void 0 } = $$props;
  let { wallets = void 0 } = $$props;
  let { element = null } = $$props;
  let wrapper;
  createEventDispatcher();
  getContext("stripe");
  function blur() {
    element.blur();
  }
  function clear() {
    element.clear();
  }
  function destroy() {
    element.destroy();
  }
  function focus() {
    element.focus();
  }
  if ($$props.buttonHeight === void 0 && $$bindings.buttonHeight && buttonHeight !== void 0)
    $$bindings.buttonHeight(buttonHeight);
  if ($$props.buttonTheme === void 0 && $$bindings.buttonTheme && buttonTheme !== void 0)
    $$bindings.buttonTheme(buttonTheme);
  if ($$props.buttonType === void 0 && $$bindings.buttonType && buttonType !== void 0)
    $$bindings.buttonType(buttonType);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.paymentMethodOrder === void 0 && $$bindings.paymentMethodOrder && paymentMethodOrder !== void 0)
    $$bindings.paymentMethodOrder(paymentMethodOrder);
  if ($$props.wallets === void 0 && $$bindings.wallets && wallets !== void 0)
    $$bindings.wallets(wallets);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  if ($$props.blur === void 0 && $$bindings.blur && blur !== void 0)
    $$bindings.blur(blur);
  if ($$props.clear === void 0 && $$bindings.clear && clear !== void 0)
    $$bindings.clear(clear);
  if ($$props.destroy === void 0 && $$bindings.destroy && destroy !== void 0)
    $$bindings.destroy(destroy);
  if ($$props.focus === void 0 && $$bindings.focus && focus !== void 0)
    $$bindings.focus(focus);
  return `<div${add_attribute("this", wrapper, 0)}></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".error.svelte-6ufdvm{color:tomato;margin:2rem 0 0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let stripe = null;
  let elements;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h1>Express Checkout Example</h1>

<nav><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/express-checkout">View code</a></nav>

${``}

${validate_component(Elements, "Elements").$$render(
      $$result,
      {
        stripe,
        mode: "payment",
        currency: "usd",
        amount: 1099,
        elements
      },
      {
        elements: ($$value) => {
          elements = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(ExpressCheckout, "ExpressCheckout").$$render(
            $$result,
            {
              buttonHeight: 50,
              buttonTheme: { googlePay: "white" },
              buttonType: { googlePay: "donate" },
              paymentMethodOrder: ["googlePay", "link"]
            },
            {},
            {}
          )}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
