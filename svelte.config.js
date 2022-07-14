import vercel from '@sveltejs/adapter-vercel'
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  kit: {
    adapter: vercel(),
  },

  preprocess: [mdsvex(mdsvexConfig)]
}

export default config
