import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
            'prettier/prettier': [
                'error',
                {
                    semi: false,
                },
            ],
        },
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/coverage/**',
            '**/.vscode/**',
            '**/.git/**',
        ],
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: { globals: globals.node },
    },
    eslintConfigPrettier,
    eslintPluginPrettierRecommended,
])
