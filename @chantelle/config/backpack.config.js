/* eslint fp/no-mutation:0,import/no-commonjs:0 */
const { debug } = require('@chantelle/util')

const webpack = ({ plugins, ...config }) => ({
  plugins,
  ...config,
})

module.exports = { webpack }
