import { c as create_ssr_component, f as createEventDispatcher, g as getContext, d as add_attribute, v as validate_component } from "../../../../chunks/index2.js";
import "@stripe/stripe-js";
import { E as Elements } from "../../../../chunks/Elements.js";
const Ideal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classes = {} } = $$props;
  let { style = {} } = $$props;
  let { value = "" } = $$props;
  let { disabled = false } = $$props;
  let { hideIcon = true } = $$props;
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
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.hideIcon === void 0 && $$bindings.hideIcon && hideIcon !== void 0)
    $$bindings.hideIcon(hideIcon);
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
  code: ".error.svelte-4i9m9b{color:tomato;margin:2rem 0 0}form.svelte-4i9m9b{display:flex;flex-direction:column;gap:10px;margin:2rem 0}input.svelte-4i9m9b,.input{border:solid 1px var(--gray-color);padding:1rem;border-radius:5px;background:white}button.svelte-4i9m9b{padding:1rem;border-radius:5px;border:solid 1px #ccc;color:white;background:var(--link-color);font-size:1.2rem;margin:1rem 0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let stripe = null;
  let idealElement;
  let name;
  let email;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<h1>iDEAL Example</h1>

<nav><a href="https://github.com/joshnuss/svelte-stripe/tree/main/src/routes/examples/ideal">View code</a></nav>

${``}

${validate_component(Elements, "Elements").$$render($$result, { stripe }, {}, {
      default: () => {
        return `<form class="svelte-4i9m9b"><input name="name" placeholder="Name" ${""} class="svelte-4i9m9b"${add_attribute("value", name, 0)}>
    <input name="email" placeholder="E-mail" type="email" ${""} class="svelte-4i9m9b"${add_attribute("value", email, 0)}>
    ${validate_component(Ideal, "Ideal").$$render(
          $$result,
          {
            classes: { base: "input" },
            element: idealElement
          },
          {
            element: ($$value) => {
              idealElement = $$value;
              $$settled = false;
            }
          },
          {}
        )}

    <button ${""} class="svelte-4i9m9b">${`Pay`}</button></form>`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
