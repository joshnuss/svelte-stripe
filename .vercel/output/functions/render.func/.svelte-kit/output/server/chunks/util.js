const isServer = typeof window === "undefined";
function register(stripe) {
  if (!isServer) {
    return stripe.registerAppInfo({
      name: "svelte-stripe-js",
      url: "https://svelte-stripe-js.vercel.app"
    });
  }
}
export {
  register as r
};
