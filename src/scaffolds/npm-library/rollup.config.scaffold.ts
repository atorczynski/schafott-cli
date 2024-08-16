export const rollupConfigLib = `// rollup.config.js
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import pkg from './package.json' assert { type: 'json' }

export default = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    {
      file: pkg.main,

      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    terser({
      format: {
        comments: (node, comment) => {
          const text = comment.value
          const type = comment.type
          if (type === 'comment2') {
            // multiline comment
            return /@preserve|@license|@cc_on/i.test(text)
          }
        },
      },
    }),
  ],
}
`;
