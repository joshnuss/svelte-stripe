import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import mkcert from 'vite-plugin-mkcert'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    vite: {
      server: {
        https: true,
      },
      plugins: [ mkcert.default({hosts: ['localhost', 'app.local']}) ]
    }
  },

  preprocess: [mdsvex(mdsvexConfig)]
}

export default config
