module.exports = {
  env: { browser: true },
  extends: '@fuelrats/eslint-config',
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'new-parens': ['off'],

    // import
    'import/no-anonymous-default-export': ['off'],
  },
}
