module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'airbnb-typescript',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: ['**/*.stories.*', '**/.storybook/**/*.*'],
                peerDependencies: true
            }
        ],
        'import/prefer-default-export': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off'
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    }
};
