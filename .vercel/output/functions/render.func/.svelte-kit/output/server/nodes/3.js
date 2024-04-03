

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/examples/afterpay-clearpay/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.ddaf4cdb.js","_app/immutable/chunks/index.ba8c4f3a.js","_app/immutable/chunks/paths.52e6513e.js","_app/immutable/chunks/public.56157045.js"];
export const stylesheets = ["_app/immutable/assets/3.2ff0af50.css"];
export const fonts = [];
