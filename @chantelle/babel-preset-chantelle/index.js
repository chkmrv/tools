/* eslint fp/no-mutation:0, import/no-commonjs:0 */

process.env.BABEL_ENV =
  process.env.BABEL_ENV || process.env.NODE_ENV || 'development'

const preset = {
  plugins: [
    [
      'flow-runtime',
      {
        assert: true,
        annotate: true,
      },
    ],
    'transform-decorators-legacy',
    'add-module-exports',
  ],
  presets: [
    'flow-runtime',
    'stage-2',
    'react',
    'react-app',
    [
      'env',
      {
        useBuiltIns: true,
        targets: {
          browsers: ['last 2 versions'],
          node: 'current',
        },
      },
    ],
  ],
}

module.exports = preset
