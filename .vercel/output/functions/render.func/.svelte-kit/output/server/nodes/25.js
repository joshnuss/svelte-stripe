

export const index = 25;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/examples/sepa/thanks/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/25.5f9e9e0d.js","_app/immutable/chunks/index.ba8c4f3a.js"];
export const stylesheets = [];
export const fonts = [];
