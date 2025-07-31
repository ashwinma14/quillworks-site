const isCI = process.env.CI === 'true' || process.env.NODE_ENV === 'production';

module.exports = {
  // Configuration for JavaScript files
  extends: [
    'airbnb-base',
    'next/core-web-vitals', // Needed to avoid warning in next.js build: 'The Next.js plugin was not detected in your ESLint configuration'
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    // Configuration for TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: [
        '@typescript-eslint',
        'unused-imports',
        'tailwindcss',
        'simple-import-sort',
      ],
      extends: [
        'plugin:tailwindcss/recommended',
        'airbnb-typescript',
        'next/core-web-vitals',
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto',
          },
        ],
        'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
        'react/require-default-props': 'off', // Allow non-defined react props as undefined
        'react/jsx-props-no-spreading': 'off', // _app.tsx uses spread operator and also, react-hook-form
        'react-hooks/exhaustive-deps': 'off', // Incorrectly report needed dependency with Next.js router
        '@next/next/no-img-element': 'off', // We currently not using next/image because it isn't supported with SSG mode
        '@next/next/link-passhref': 'off', // Only needed when the child of Link wraps an <a> tag
        '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
        '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
        'no-restricted-syntax': [
          'error',
          'ForInStatement',
          'LabeledStatement',
          'WithStatement',
        ], // Overrides Airbnb configuration and enable no-restricted-syntax
        'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
        'tailwindcss/no-custom-classname': 'off', // Disabled otherwise nightmare to allow each custom tailwind classes
        'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
        'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        // CI Performance Optimizations - disable expensive rules in CI
        ...(isCI && {
          'import/no-duplicates': 'off', // Expensive rule, disable in CI
          'import/order': 'off', // Use simple-import-sort instead
          'import/no-cycle': 'off', // Very expensive for large projects
          '@typescript-eslint/no-floating-promises': 'off', // Expensive type checking
          '@typescript-eslint/restrict-template-expressions': 'off', // Expensive type checking
          '@typescript-eslint/no-unsafe-assignment': 'off', // Expensive type checking
          '@typescript-eslint/no-unsafe-member-access': 'off', // Expensive type checking
          '@typescript-eslint/no-unsafe-call': 'off', // Expensive type checking
          'tailwindcss/classnames-order': 'off', // Can be expensive with many classes
        }),
      },
    },
    // Further CI optimizations for specific file patterns
    ...(isCI
      ? [
          {
            files: [
              '**/*.spec.ts',
              '**/*.spec.tsx',
              '**/*.test.ts',
              '**/*.test.tsx',
            ],
            rules: {
              // Disable expensive rules for test files in CI
              '@typescript-eslint/no-explicit-any': 'off',
              '@typescript-eslint/no-non-null-assertion': 'off',
              'import/no-extraneous-dependencies': 'off',
            },
          },
        ]
      : []),
  ],
};
