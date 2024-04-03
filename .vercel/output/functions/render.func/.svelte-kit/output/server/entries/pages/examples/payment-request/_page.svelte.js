import { c as create_ssr_component, f as createEventDispatcher, g as getContext, d as add_attribute, v as validate_component } from "../../../../chunks/index2.js";
import "@stripe/stripe-js";
import { E as Elements } from "../../../../chunks/Elements.js";
const PaymentRequestButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes = {} } = $$props;
  let { style = {} } = $$props;
  let { paymentRequest } = $$props;
  let { element = null } = $$props;
  let { canMakePayment = null } = $$props;
  let wrapper;
  createEventDispatcher();
  getContext("stripe");
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.paymentRequest === void 0 && $$bindings.paymentRequest && paymentRequest !== void 0)
    $$bindings.paymentRequest(paymentRequest);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  if ($$props.canMakePayment === void 0 && $$bindings.canMakePayment && canMakePayment !== void 0)
    $$bindings.canMakePayment(canMakePayment);
  return `<div${add_attribute("this", wrapper, 0)}></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".error.svelte-cwv56c{color:tomato}.wrapper.svelte-cwv56c{margin:3rem 0;width:300px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let stripe = null;
  const paymentRequest = {
    country: "US",
    currency: "usd",
    total: { label: "Demo total", amount: 1099 },
    requestPayerName: true,
    requestPayerEmail: true
  };
  $$result.css.add(css);
  return `<h1>Payment Request Example</h1>

<p>If you see a blank screen, it&#39;s because this demo will only work if the TLD is <code>https://localhost</code> or if you&#39;re using production keys.
</p>
<p>For ApplePay, the production domain must be <a href="https://support.stripe.com/questions/enable-apple-pay-on-your-stripe-account">submitted to Apple</a>.
</p>

<nav><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-request">View code</a></nav>

${``}

${validate_component(Elements, "Elements").$$render($$result, { stripe }, {}, {
    default: () => {
      return `<div class="wrapper svelte-cwv56c">${validate_component(PaymentRequestButton, "PaymentRequestButton").$$render($$result, { paymentRequest }, {}, {})}</div>`;
    }
  })}`;
});
export {
  Page as default
};
