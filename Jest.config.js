module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['app/**/*.js'],
  modulePathIgnorePatterns: [],
  coverageThreshold: {
    global: {
      statements: 50,
      functions: 50,
      lines: 50
    }
  }
};
