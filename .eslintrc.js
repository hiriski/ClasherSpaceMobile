module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.js', '.jsx', '*.ts', '*.tsx'],
      rules: {
        semi: 0,
        'no-extra-semi': 0,
        'react/react-in-jsx-scope': 0,
        'react-hooks/exhaustive-deps': 0,
        'react-native/no-inline-styles': 0,
        'jsx-quotes': ['error', 'prefer-single'],
        '@typescript-eslint/no-unused-vars': 'warn',
      },
    },
  ],
}
