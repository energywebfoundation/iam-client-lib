module.exports = {
  extends: ['@energyweb'],
  rules: {
    "@typescript-eslint/no-shadow": ["warn", {ignoreFunctionTypeParameterNameValueShadow: true}],
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.eslint.json'],
  },
  ignorePatterns: ['src/utils/domains-build.js'],
};
