module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.js'],
  transform: { '^.+\\.js$': 'babel-jest' },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
  },
}
