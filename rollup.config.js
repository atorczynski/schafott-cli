import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import url from '@rollup/plugin-url'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  plugins: [typescript(), json(), url()]
}
