module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.js', '.jsx', '*.ts', '*.tsx'],
      rules: {
        semi: [1, 'never'],
        'no-shadow': 'off',
        'react-native/no-inline-styles': 0,
        'react-hooks/exhaustive-deps': 0,
        'react/react-in-jsx-scope': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'prettier/prettier': 0,
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-extra-semi': 0,
      },
    },
  ],
}
