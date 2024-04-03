

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.md.js')).default;
export const imports = ["_app/immutable/nodes/2.a2a332f7.js","_app/immutable/chunks/index.ba8c4f3a.js"];
export const stylesheets = [];
export const fonts = [];
