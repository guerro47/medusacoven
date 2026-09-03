import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: { import: importPlugin },
    rules: {
      // Low-risk processors are hard-blocked. High-risk rails only
      // (CCBill / Segpay) and only inside lib/high-risk-payments.ts.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['stripe', '@stripe/*', '@paypal/*', 'braintree*'],
              message:
                'Low-risk processors are hard-blocked. Use lib/high-risk-payments.ts (CCBill / Segpay only).',
            },
          ],
        },
      ],
      // Module boundaries: keep the marketing surface, the design system,
      // and the post-auth modules independently shippable.
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './components/ui',
              from: './components/marketing',
              message: 'Design-system primitives must not depend on marketing components.',
            },
            {
              target: './components/ui',
              from: './components/modules',
              message: 'Design-system primitives must not depend on app modules.',
            },
            {
              target: './components/ui',
              from: './components/3d',
              message: 'Design-system primitives must not depend on 3D scenes.',
            },
            {
              target: './components/marketing',
              from: './components/modules',
              message: 'The marketing surface must ship without touching app modules.',
            },
            {
              target: './components/marketing',
              from: './lib/high-risk-payments.ts',
              message: 'Payment rails never leak into the marketing surface.',
            },
            {
              target: './components/marketing',
              from: './modules',
              message: 'The marketing surface must ship without the module domain layer.',
            },
            {
              target: './components/ui',
              from: './modules',
              message: 'Design-system primitives must not depend on the module domain layer.',
            },
            {
              target: './components/3d',
              from: './modules',
              message: '3D scenes must not depend on the module domain layer.',
            },
            {
              target: './components/3d',
              from: './lib/high-risk-payments.ts',
              message: 'Payment rails never leak into 3D scenes.',
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
