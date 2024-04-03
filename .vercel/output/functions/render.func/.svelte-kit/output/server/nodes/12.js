

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/examples/express-checkout/thanks/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.74df00ba.js","_app/immutable/chunks/index.ba8c4f3a.js"];
export const stylesheets = [];
export const fonts = [];
