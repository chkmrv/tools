'use strict'

process.env.BABEL_ENV = process.env.BABEL_ENV || 'development'

module.exports = {
  plugins: [
    'babel-plugin-flow-runtime',
    'babel-plugin-add-module-exports',
    'babel-plugin-transform-decorators-legacy',
  ].map(require.resolve),
  presets: [
    [
      require.resolve('babel-preset-env'),
      {
        "useBuiltIns": true,
        'targets': {
          'browsers': [
            'last 2 versions',
          ],
          'node': 'current',
        },
      },
    ],
    require.resolve('babel-preset-react-app'),
    require.resolve('babel-preset-stage-0'),
  ]
}
