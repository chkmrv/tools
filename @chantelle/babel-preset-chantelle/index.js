/* eslint fp/no-mutation:0, import/no-commonjs:0, fp/no-unused-expression:0 */

const env = (process.env.BABEL_ENV =
  process.env.BABEL_ENV || process.env.NODE_ENV || 'development')

const isProduction = env === 'production'

console.info('BABEL_ENV is', env)
console.info('BUILD_TARGET is', process.env.BUILD_TARGET)

const browsers = ['last 2 versions']
const node = 'current'
const targets =
  process.env.BUILD_TARGET === 'client'
    ? { browsers }
    : process.env.BUILD_TARGET === 'server' ? { node } : { browsers, node }

const flowRuntimePlugin = [
  require.resolve('babel-plugin-flow-runtime'),
  { annotate: true, assert: false },
]
const devPlugins = isProduction ? [] : [flowRuntimePlugin]
const commonPlugins = [
  require.resolve('babel-plugin-add-react-displayname'),
  require.resolve('babel-plugin-add-module-exports'),
  require.resolve('babel-plugin-ramda'),
  [
    require.resolve('babel-plugin-transform-runtime'),
    {
      helpers: false,
      polyfill: false,
      regenerator: true,
    },
  ],
]
const devPresets = isProduction
  ? []
  : [require.resolve('babel-preset-flow-runtime')]
const commonPresets = [
  require.resolve('babel-preset-flow'),
  require.resolve('babel-preset-stage-1'),
  require.resolve('babel-preset-react'),
  require.resolve('babel-preset-react-app'),
  [
    require.resolve('babel-preset-env'),
    {
      targets,
      modules: false,
      useBuiltIns: 'usage',
    },
  ],
]

const preset = {
  plugins: devPlugins.concat(commonPlugins),
  presets: devPresets.concat(commonPresets),
}

module.exports = preset
