import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: false,
    formatters: true,
    ignores: [
      'node_modules/',
      '.vscode/',
      '.github/',
      'dist/',
      'README.md',
      'LICENSE',
      'shims.d.ts',
      'auto-imports.d.ts',
      'components.d.ts',
      'typed-router.d.ts',
      'public/',
      'src/assets/',
      'src/components/ui/',
    ],
  },
  {
    rules: {
      'no-console': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false,
        ignores: [],
      }],
    },
  },
)
