module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:import/recommended',
        'plugin:tailwindcss/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['simple-import-sort', 'import', 'react', 'react-hooks', '@typescript-eslint', 'prettier', 'tailwindcss'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        camelcase: 'error',
        'spaced-comment': 'error',
        quotes: ['error', 'single'],
        'no-duplicate-imports': 'error',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
        'react/prop-types': 'off',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'tailwindcss/no-custom-classname': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
        tailwindcss: {
            config: './tailwind.config.js',  // Path to Tailwind configuration
        },
    },
};