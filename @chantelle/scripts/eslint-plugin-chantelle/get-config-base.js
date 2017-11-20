export default () => ({
  parser: require.resolve('babel-eslint'),
  plugins: ['chantelle'],
  parserOptions: {
    'ecmaVersion': 7,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
  },
})
