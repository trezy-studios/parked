import { eslint } from 'rollup-plugin-eslint'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import notify from 'rollup-plugin-notify'
import progress from 'rollup-plugin-progress'
import resolve from 'rollup-plugin-node-resolve'
import visualizer from 'rollup-plugin-visualizer'





export default [
  /***************************************************************************\
    @parked/core
  \***************************************************************************/
  {
    input: 'packages/core/src/index.js',
    output: [
      {
        file: 'packages/core/dist/index.js',
        format: 'umd',
        name: '@parked/core',
      },
      {
        file: 'packages/core/dist/index.min.js',
        format: 'umd',
        name: '@parked/core',
        plugins: [
          terser(),
        ],
      },
    ],
    plugins: [
      progress(),
      resolve(),
      eslint(),
      babel({
        exclude: 'node_modules/**',
      }),
      sizeSnapshot(),
      visualizer(),
      notify(),
    ],
]
