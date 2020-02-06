module.exports = {
  ignore: 'node_modules',
  recursive: true,
  require: '@babel/register',
  spec: './packages/**/*.test.js',
}
