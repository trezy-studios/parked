// Module imports
import { eslint } from 'rollup-plugin-eslint'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import moment from 'moment'
import notify from 'rollup-plugin-notify'
import path from 'path'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-re'
import resolve from 'rollup-plugin-node-resolve'
import visualizer from 'rollup-plugin-visualizer'





export default options => {
  const {
    name,
    path: packagePath,
  } = options
  const {
    version,
  } = require(path.resolve(packagePath, 'package.json'))

  return {
    input: `${packagePath}/src/index.js`,
    output: [
      {
        file: `${packagePath}/dist/index.js`,
        format: 'umd',
        name,
      },
      {
        file: `${packagePath}/dist/index.min.js`,
        format: 'umd',
        name,
        plugins: [
          terser(),
        ],
      },
    ],
    plugins: [
      progress(),
      resolve(),
      eslint(),
      replace({
        patterns: [
          {
            match: /.*/,
            test: '[BUILD_VERSION]',
            replace: () => {
              if (version === '0.0.0') {
                return 'Development Build'
              }

              return `v${version}`
            },
          },
          {
            match: /.*/,
            test: '[BUILD_DATE]',
            replace: moment().utc().format('DD MMMM, Y HH:mm:ssZZ'),
          },
        ],
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      sizeSnapshot(),
      visualizer(),
      notify(),
    ],
  }
}
