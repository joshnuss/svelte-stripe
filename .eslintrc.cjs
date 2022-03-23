module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier', 'plugin:jsdoc/recommended'],
  plugins: ['svelte3', 'jsdoc'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  }
}
