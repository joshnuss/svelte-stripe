

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/examples/alipay/thanks/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.5f1a5a96.js","_app/immutable/chunks/index.ba8c4f3a.js"];
export const stylesheets = [];
export const fonts = [];
