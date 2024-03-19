module.exports = {
  transform: {
    '^.+\\.ts?$': ['ts-jest', { tsconfig: './__tests__/tsconfig.json' }],
  },
  testEnvironment: 'jsdom',
  testRegex: '/__tests__/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
