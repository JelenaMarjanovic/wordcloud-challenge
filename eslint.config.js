import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  { ignores: ['dist', 'node_modules'] },

  // Root language options
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.browser }
    }
  },

  // Flat-native configs
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],

  // eslintrc-style adapted configs (avoid parserOptions issues)
  ...compat.extends('plugin:jsx-a11y/recommended'),
  // ...compat.extends('plugin:react-refresh/recommended'), // optional

  // Our local overrides
  {
    plugins: {
      // keep only Prettier here to avoid plugin redefinition
      prettier
    },
    rules: {
      // Prettier as lint rule
      'prettier/prettier': 'warn',

      // Extra React Hooks strictness (config already sets base rules)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TS hygiene (plugin already loaded via tseslint configs)
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/consistent-type-imports': 'warn',

      // A11y (plugin already loaded via compat)
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'jsx-a11y/label-has-associated-control': 'warn',

      // Clean code
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-alert': 'warn'
    }
  }
];
