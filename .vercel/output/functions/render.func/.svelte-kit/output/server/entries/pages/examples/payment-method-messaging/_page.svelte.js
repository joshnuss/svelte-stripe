import { c as create_ssr_component, f as createEventDispatcher, g as getContext, d as add_attribute, v as validate_component } from "../../../../chunks/index2.js";
import "@stripe/stripe-js";
import { E as Elements } from "../../../../chunks/Elements.js";
const PaymentMethodMessaging = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { amount } = $$props;
  let { currency } = $$props;
  let { paymentMethodTypes } = $$props;
  let { countryCode } = $$props;
  let { logoColor = null } = $$props;
  let { metadata = null } = $$props;
  let { element = null } = $$props;
  let wrapper;
  createEventDispatcher();
  getContext("stripe");
  if ($$props.amount === void 0 && $$bindings.amount && amount !== void 0)
    $$bindings.amount(amount);
  if ($$props.currency === void 0 && $$bindings.currency && currency !== void 0)
    $$bindings.currency(currency);
  if ($$props.paymentMethodTypes === void 0 && $$bindings.paymentMethodTypes && paymentMethodTypes !== void 0)
    $$bindings.paymentMethodTypes(paymentMethodTypes);
  if ($$props.countryCode === void 0 && $$bindings.countryCode && countryCode !== void 0)
    $$bindings.countryCode(countryCode);
  if ($$props.logoColor === void 0 && $$bindings.logoColor && logoColor !== void 0)
    $$bindings.logoColor(logoColor);
  if ($$props.metadata === void 0 && $$bindings.metadata && metadata !== void 0)
    $$bindings.metadata(metadata);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  return `<div${add_attribute("this", wrapper, 0)}></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let stripe = null;
  return `<h1>Payment Method Messaging Example</h1>

<nav><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/payment-method-messaging">View code</a></nav>

${validate_component(Elements, "Elements").$$render($$result, { stripe }, {}, {
    default: () => {
      return `${validate_component(PaymentMethodMessaging, "PaymentMethodMessaging").$$render(
        $$result,
        {
          currency: "USD",
          countryCode: "US",
          amount: 1e5,
          paymentMethodTypes: ["afterpay_clearpay", "klarna", "affirm"]
        },
        {},
        {}
      )}`;
    }
  })}`;
});
export {
  Page as default
};
