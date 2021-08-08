export function mount(node, type, elements, dispatch, options) {
  const element = elements.create(type, options)

  element.mount(node)
  element.on('change', (e) => dispatch('change', e))
  element.on('ready', (e) => dispatch('ready', e))
  element.on('focus', (e) => dispatch('focus', e))
  element.on('blur', (e) => dispatch('blur', e))
  element.on('escape', (e) => dispatch('escape', e))
  element.on('click', (e) => dispatch('click', e))

  return element
}
