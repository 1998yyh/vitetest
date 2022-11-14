module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    globals: { defineOptions: 'writable' },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'vue-global-api',
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 'latest', // 这个配置和 Acron 的 ecmaVersion 是兼容的，可以配置 ES + 数字(如 ES6)或者ES + 年份(如 ES2015)，也可以直接配置为latest，启用最新的 ES 语法。
        parser: '@typescript-eslint/parser',
        sourceType: 'module', // 默认为script，如果使用 ES Module 则应设置为module
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: [
        'vue',
        '@typescript-eslint',
        'prettier'
    ],
    rules: {
        indent: [0, 4],
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'none'
                },
                singleline: {
                    delimiter: 'semi'
                }
            }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'space-before-function-paren': ['off'],
        'vue/array-bracket-spacing': 'error',
        'vue/arrow-spacing': 'error',
        'vue/block-spacing': 'error',
        'vue/brace-style': 'error',
        'vue/camelcase': 'error',
        'vue/comma-dangle': 'error',
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/eqeqeq': 'error',
        'vue/key-spacing': 'error',
        'vue/match-component-file-name': 'error',
        'vue/object-curly-spacing': 'off',
        'no-use-before-define': 'off'
    }
}
