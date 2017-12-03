/* eslint fp/no-mutation:0,import/no-commonjs:0 */
const webpack = ({ plugins: [DefinePluginToDrop, ...plugins], ...config }) => ({
  plugins: [...plugins],
  ...config,
})

module.exports = { webpack }
