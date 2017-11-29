/* eslint fp/no-mutation:0,import/no-commonjs:0 */
const { debug } = require('@chantelle/util')
const { DefinePlugin } = require('webpack')

const webpack = ({
  plugins: [
    DefinePluginToDrop,
    // ...plugins,
  ], ...config
}) => ({
  plugins: [
    // debug(new DefinePlugin({}), 'DefinePlugin %O'), //eslint-disable-line better/no-new
    // ...plugins,
  ],
  ...config,
})

module.exports = { webpack }
