module.exports = {
    verbose: true,
    transform: {
        "\\.(ts|tsx)$": "ts-jest",
        "\\.mjs$": "babel-jest",
    },
    transformIgnorePatterns: ["node_modules/.+\\.!mjs$"],
    testEnvironment: "node",
    testRegex: "(/test/(.|\\.)*\\.e2e\\.ts$)",
    moduleFileExtensions: ["ts", "tsx", "js", "json"],
    coveragePathIgnorePatterns: ["/node_modules/", "/test/"],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
    collectCoverageFrom: ["src/*.{js,ts}"],
    setupFilesAfterEnv: ["./jest.setup.js"],
};
