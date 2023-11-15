/**
 * @param {HTMLElement} node
 * @param {import('@stripe/stripe-js').StripeElementType} type
 * @param {import('@stripe/stripe-js').StripeElements} elements
 * @param {<EventKey extends string>(type: EventKey, detail?: any) => void} dispatch
 * @param {import('@stripe/stripe-js').StripeElementsOptions} options
 *
 * @returns {import('@stripe/stripe-js').StripeElementBase}
 */
export function mount(node, type, elements, dispatch, options = {}) {
  const element = elements.create(type, options)

  element.mount(node)
  element.on('change', (e) => dispatch('change', e))
  element.on('ready', (e) => dispatch('ready', e))
  element.on('focus', (e) => dispatch('focus', e))
  element.on('blur', (e) => dispatch('blur', e))
  element.on('escape', (e) => dispatch('escape', e))
  element.on('click', (e) => dispatch('click', e))
  element.on('loaderror', (e) => dispatch('loaderror', e))
  element.on('loaderstart', (e) => dispatch('loaderstart', e))
  element.on('networkschange', (e) => dispatch('networkschange', e))

  return element
}

export const isServer = typeof window === 'undefined'

/**
 * @param {import('@stripe/stripe-js').Stripe} stripe
 * @returns {void}
 */
export function register(stripe) {
  if (!isServer) {
    return stripe.registerAppInfo({
      name: 'svelte-stripe-js',
      url: 'https://svelte-stripe-js.vercel.app'
    })
  }
}
