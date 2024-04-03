

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/examples/credit-card/thanks/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.646745ff.js","_app/immutable/chunks/index.ba8c4f3a.js"];
export const stylesheets = [];
export const fonts = [];
