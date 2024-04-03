

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.de47b30c.js","_app/immutable/chunks/index.ba8c4f3a.js","_app/immutable/chunks/singletons.1cf45adc.js","_app/immutable/chunks/paths.52e6513e.js"];
export const stylesheets = [];
export const fonts = [];
