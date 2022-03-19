module.exports = {
  displayName: 'spotify-consumer',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    'firebase/app': `${__dirname}/src/__mocks__/firebase/app.js`,
    'firebase/auth': `${__dirname}/src/__mocks__/firebase/auth.js`,
    'firebase/database': `${__dirname}/src/__mocks__/firebase/database.js`,
    'firebase/firestore': `${__dirname}/src/__mocks__/firebase/firestore.js`,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/spotify-consumer',
};
