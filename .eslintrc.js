module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  plugins: ['@typescript-eslint', 'prettier', 'node'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] }
    ]
  }
};
