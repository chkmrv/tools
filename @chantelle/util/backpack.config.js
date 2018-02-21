/* eslint fp/no-mutation:0,import/no-commonjs:0 */

const { pipe } = require('ramda')
const { reducePluginLeft, web, dotEnv } = require('@nod/webpack-config-presets')

const webpack = (config, options, webpack) =>
  pipe(reducePluginLeft, web, dotEnv)(config)

module.exports = { webpack }
