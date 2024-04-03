import { c as create_ssr_component, f as createEventDispatcher, g as getContext, d as add_attribute, v as validate_component } from "../../../../chunks/index2.js";
import "@stripe/stripe-js";
import { E as Elements } from "../../../../chunks/Elements.js";
const CardNumber = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes = {} } = $$props;
  let { style = {} } = $$props;
  let { placeholder = "Card number" } = $$props;
  let { disabled = false } = $$props;
  let { showIcon = true } = $$props;
  let { iconStyle = "default" } = $$props;
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
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.showIcon === void 0 && $$bindings.showIcon && showIcon !== void 0)
    $$bindings.showIcon(showIcon);
  if ($$props.iconStyle === void 0 && $$bindings.iconStyle && iconStyle !== void 0)
    $$bindings.iconStyle(iconStyle);
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
const CardExpiry = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes = {} } = $$props;
  let { style = {} } = $$props;
  let { placeholder = "MM / YY" } = $$props;
  let { disabled = false } = $$props;
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
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
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
const CardCvc = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes = {} } = $$props;
  let { style = {} } = $$props;
  let { placeholder = "CVC" } = $$props;
  let { disabled = false } = $$props;
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
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
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
  code: ".error.svelte-1e3zach{color:tomato;margin:2rem 0 0}form.svelte-1e3zach{display:flex;flex-direction:column;gap:10px;margin:2rem 0}.row.svelte-1e3zach{display:flex;flex-direction:row;gap:5px}input.svelte-1e3zach,.input{border:solid 1px var(--gray-color);padding:1rem;border-radius:5px;background:white}.row.svelte-1e3zach .input{width:20%}button.svelte-1e3zach{padding:1rem;border-radius:5px;border:solid 1px #ccc;color:white;background:var(--link-color);font-size:1.2rem;margin:1rem 0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let stripe = null;
  let cardElement;
  let name;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h1>Credit Card Example</h1>

<nav><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/credit-card">View code</a></nav>

${``}

${validate_component(Elements, "Elements").$$render($$result, { stripe }, {}, {
      default: () => {
        return `<form class="svelte-1e3zach"><input name="name" placeholder="Your name" ${""} class="svelte-1e3zach"${add_attribute("value", name, 0)}>
    ${validate_component(CardNumber, "CardNumber").$$render(
          $$result,
          {
            classes: { base: "input" },
            element: cardElement
          },
          {
            element: ($$value) => {
              cardElement = $$value;
              $$settled = false;
            }
          },
          {}
        )}

    <div class="row svelte-1e3zach">${validate_component(CardExpiry, "CardExpiry").$$render($$result, { classes: { base: "input" } }, {}, {})}
      ${validate_component(CardCvc, "CardCvc").$$render($$result, { classes: { base: "input" } }, {}, {})}</div>

    <button ${""} class="svelte-1e3zach">${`Pay`}</button></form>`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
