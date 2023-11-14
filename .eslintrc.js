module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "prettier", "react-app", "react-app/jest","plugin:react/jsx-runtime"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    indent: "off",
    camelcase: ["error", { "properties": "never" }],
    "prettier/prettier": error,
     eqeqeq: ["error", "always"],
    "no-unused-vars": ["error"],
    "react/jsx-uses-react": off,
    "react/react-in-jsx-scope": off,
    
  },
}
