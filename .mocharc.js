module.exports = {
  ignore: '(node_modules|dist)',
  recursive: true,
  require: '@babel/register',
  spec: './packages/**/*.test.js',
}
