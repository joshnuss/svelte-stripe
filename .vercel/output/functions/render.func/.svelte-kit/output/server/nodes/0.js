

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.db90febb.js","_app/immutable/chunks/index.ba8c4f3a.js"];
export const stylesheets = ["_app/immutable/assets/0.26728d44.css"];
export const fonts = [];
