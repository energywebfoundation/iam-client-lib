module.exports = {
  verbose: true,
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
    '\\.(mjs|js)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@energyweb/ekc)',
    'node_modules/.+(?!\\.mjs)$',
  ],
  testEnvironment: 'node',
  testRegex: '(/(e2e|src)/(.|\\.)*claims\\.service\\.(e2e|spec)\\.ts$)',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  coveragePathIgnorePatterns: ['/node_modules/', '/e2e/', '/test/'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  collectCoverageFrom: ['src/*.{js,ts}'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
};
