module.exports = {
  testEnvironment: 'node',
  verbose: true,
  setupFiles: ['dotenv/config'],
  testMatch: ['**/*.test.js'],
  testTimeout: 10000,
  roots: ['<rootDir>/tests'],
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
  moduleFileExtensions: ['js', 'json']
};