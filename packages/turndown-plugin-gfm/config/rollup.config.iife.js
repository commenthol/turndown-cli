import config from './rollup.config'

export default config({
  output: {
    name: 'turndownPluginGfm',
    format: 'iife',
    file: 'dist/turndown-plugin-gfm.js'
  }
})
