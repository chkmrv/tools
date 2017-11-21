module.exports = () => ({  //eslint-disable-line
  parser: require.resolve('babel-eslint'),
  plugins: ['@chantelle/chantelle', 'babel', 'flowtype', 'fp', 'import', 'jsx-a11y', 'react', 'better'],
  parserOptions: {
    'ecmaVersion': 7,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
  },
})
