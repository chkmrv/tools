module.exports = () => ({  //eslint-disable-line
  parser: require.resolve('babel-eslint'),
  plugins: ['@chantelle/chantelle'],
  parserOptions: {
    'ecmaVersion': 7,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
  },
})
