module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:jsdoc/recommended',
    'plugin:svelte/recommended'
  ],
  plugins: ['jsdoc'],
  overrides: [{ files: ['*.svelte'], parser: 'svelte-eslint-parser' }],
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
