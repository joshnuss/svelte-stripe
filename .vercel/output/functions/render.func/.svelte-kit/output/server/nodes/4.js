

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/examples/afterpay-clearpay/thanks/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.3bfc3f6d.js","_app/immutable/chunks/index.ba8c4f3a.js"];
export const stylesheets = [];
export const fonts = [];
