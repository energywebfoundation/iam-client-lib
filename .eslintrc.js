module.exports = {
  extends: ['@energyweb'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
};
