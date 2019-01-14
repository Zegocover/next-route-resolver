module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
        "jest/globals": true,
    },

    globals: {
        fetch: true,
        FormData: true,
    },

    parser: "babel-eslint",

    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            generators: true,
            experimentalObjectRestSpread: true,
        },
    },

    extends: ["eslint:recommended", "prettier"],

    plugins: ["jest", "prettier"],

    rules: {
        strict: "off",

        "prettier/prettier": [
            "error",
            { singleQuote: false, trailingComma: "all" },
        ],

        // Only warn on console use
        "no-console": "warn",

        // Only warn if there are any unused variables
        "no-unused-vars": "warn",

        // Don't error on empty code blocks
        "no-empty": "off",
    },
};
