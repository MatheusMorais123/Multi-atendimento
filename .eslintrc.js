module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react', 'prettier'],
  rules: {
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@typescript-eslint/consistent-type-assertions': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-case-declarations': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'
  }
}
