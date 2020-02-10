// Module imports
import { terser } from 'rollup-plugin-terser'





// Local constants
import plugins from './default-plugins'





export default options => {
  const {
    name,
    path,
  } = options

  return {
    input: `${path}/src/index.js`,
    output: [
      {
        file: `${path}/dist/index.js`,
        format: 'umd',
        name: name,
      },
      {
        file: `${path}/dist/index.min.js`,
        format: 'umd',
        name: name,
        plugins: [
          terser(),
        ],
      },
    ],
    plugins,
  }
}
