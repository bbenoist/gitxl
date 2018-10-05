module.exports = {
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "html"],
  coverageThreshold: {
    // // Uncomment to enforce 100% coverage on the src directory.
    // "./src/": {
    //   branches: 100,
    //   functions: 100,
    //   lines: 100,
    //   statements: 100,
    // },
  },
  moduleFileExtensions: ["ts", "js"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/"],
  testRegex: "\\.test\\.ts$",
  transform: { ".(ts)": "ts-jest" },
};
