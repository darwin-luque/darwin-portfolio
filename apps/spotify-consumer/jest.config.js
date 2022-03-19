module.exports = {
  displayName: 'spotify-consumer',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    'firebase/app': '<rootDir>/src/__mocks__/firebase/app.js',
    'firebase/auth': '<rootDir>/src/__mocks__/firebase/auth.js',
    'firebase/database': '<rootDir>/src/__mocks__/firebase/database.js',
    'firebase/firestore': '<rootDir>/src/__mocks__/firebase/firestore.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/spotify-consumer',
  setupFiles: ['<rootDir>/src/__tests__/setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupAfterEnv.ts'],
};
