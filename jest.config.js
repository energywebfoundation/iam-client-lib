module.exports = {
  verbose: true,
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
    "\\.mjs$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/.+\\.!mjs$"
  ],
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/test/"
  ],
  coverageThreshold: {
    global: {
      "branches": 0,
      "functions": 0,
      "lines": 0,
      "statements": 0
    }
  },
  collectCoverageFrom: [
    "src/*.{js,ts}"
  ]
};
