import * as server from '../entries/pages/examples/embedded-checkout/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/examples/embedded-checkout/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/examples/embedded-checkout/+page.server.js";
export const imports = ["_app/immutable/nodes/9.51831a3c.js","_app/immutable/chunks/index.ba8c4f3a.js","_app/immutable/chunks/public.56157045.js","_app/immutable/chunks/util.bb100f75.js"];
export const stylesheets = [];
export const fonts = [];
