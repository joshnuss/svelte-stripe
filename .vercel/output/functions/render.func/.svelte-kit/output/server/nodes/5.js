

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/examples/alipay/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.888af71d.js","_app/immutable/chunks/index.ba8c4f3a.js","_app/immutable/chunks/navigation.640da136.js","_app/immutable/chunks/singletons.1cf45adc.js","_app/immutable/chunks/paths.52e6513e.js","_app/immutable/chunks/public.56157045.js"];
export const stylesheets = ["_app/immutable/assets/5.228196d9.css"];
export const fonts = [];