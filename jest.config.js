module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '**/src/*.test.ts'],
  preset: 'ts-jest',
};
