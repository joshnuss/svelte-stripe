

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/examples/klarna/thanks/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/16.dd1fb1ee.js","_app/immutable/chunks/index.ba8c4f3a.js"];
export const stylesheets = [];
export const fonts = [];
