module.exports = {
  mount: {
    'src/': '/'
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-sass'
  ],
  devOptions: {
    open: 'none',
    output: 'stream'
  },
  buildOptions: {
    out: './build'
  },
  optimize: {
    bundle: true,
    treeshake: true,
    minify: false
  }
}
