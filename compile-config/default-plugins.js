// Module imports
import { eslint } from 'rollup-plugin-eslint'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import babel from 'rollup-plugin-babel'
import notify from 'rollup-plugin-notify'
import progress from 'rollup-plugin-progress'
import resolve from 'rollup-plugin-node-resolve'
import visualizer from 'rollup-plugin-visualizer'





export default [
  progress(),
  resolve(),
  eslint(),
  babel({
    exclude: 'node_modules/**',
  }),
  sizeSnapshot(),
  visualizer(),
  notify(),
]
