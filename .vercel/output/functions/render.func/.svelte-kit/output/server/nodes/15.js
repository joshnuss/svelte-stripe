

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/examples/klarna/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/15.8e135af2.js","_app/immutable/chunks/index.ba8c4f3a.js","_app/immutable/chunks/paths.52e6513e.js","_app/immutable/chunks/public.56157045.js"];
export const stylesheets = ["_app/immutable/assets/5.228196d9.css"];
export const fonts = [];
