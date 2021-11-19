module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['app/**/*.js'],
  modulePathIgnorePatterns: [],
  coverageThreshold: {
    global: {
      statements: 100,
      branch: 100,
      functions: 100,
      lines: 100
    }
  }
};
