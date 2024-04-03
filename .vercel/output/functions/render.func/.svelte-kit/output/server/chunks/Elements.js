import { c as create_ssr_component, a as setContext } from "./index2.js";
import { r as register } from "./util.js";
const Elements = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let appearance;
  let { stripe } = $$props;
  let { mode = void 0 } = $$props;
  let { theme = "stripe" } = $$props;
  let { variables = {} } = $$props;
  let { rules = {} } = $$props;
  let { labels = "above" } = $$props;
  let { loader = "auto" } = $$props;
  let { fonts = [] } = $$props;
  let { locale = "auto" } = $$props;
  let { currency = void 0 } = $$props;
  let { amount = void 0 } = $$props;
  let { clientSecret = void 0 } = $$props;
  let { elements = null } = $$props;
  if ($$props.stripe === void 0 && $$bindings.stripe && stripe !== void 0)
    $$bindings.stripe(stripe);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.variables === void 0 && $$bindings.variables && variables !== void 0)
    $$bindings.variables(variables);
  if ($$props.rules === void 0 && $$bindings.rules && rules !== void 0)
    $$bindings.rules(rules);
  if ($$props.labels === void 0 && $$bindings.labels && labels !== void 0)
    $$bindings.labels(labels);
  if ($$props.loader === void 0 && $$bindings.loader && loader !== void 0)
    $$bindings.loader(loader);
  if ($$props.fonts === void 0 && $$bindings.fonts && fonts !== void 0)
    $$bindings.fonts(fonts);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0)
    $$bindings.locale(locale);
  if ($$props.currency === void 0 && $$bindings.currency && currency !== void 0)
    $$bindings.currency(currency);
  if ($$props.amount === void 0 && $$bindings.amount && amount !== void 0)
    $$bindings.amount(amount);
  if ($$props.clientSecret === void 0 && $$bindings.clientSecret && clientSecret !== void 0)
    $$bindings.clientSecret(clientSecret);
  if ($$props.elements === void 0 && $$bindings.elements && elements !== void 0)
    $$bindings.elements(elements);
  appearance = { theme, variables, rules, labels };
  {
    if (stripe && !elements) {
      elements = stripe.elements({
        mode,
        currency,
        amount,
        appearance,
        clientSecret,
        fonts,
        loader,
        locale
      });
      register(stripe);
      setContext("stripe", { stripe, elements });
    }
  }
  {
    if (elements) {
      elements.update({ appearance, locale });
    }
  }
  return `${stripe && elements ? `${slots.default ? slots.default({}) : ``}` : ``}`;
});
export {
  Elements as E
};
