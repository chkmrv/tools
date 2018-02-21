/* eslint fp/no-mutation:0, import/no-commonjs:0 */

process.env.BABEL_ENV = process.env.BABEL_ENV || 'development'

module.exports = function() {
  return {
    plugins: [
      require.resolve('@babel/plugin-syntax-pipeline-operator'),
      require.resolve('@babel/plugin-proposal-pipeline-operator'),
      // [
      //   require.resolve('babel-plugin-flow-runtime'),
      //   {
      //     assert: true,
      //     annotate: true,
      //   },
      // ],
      // require.resolve('babel-plugin-add-module-exports'),
    ],
    presets: [
      // require.resolve('babel-preset-flow-runtime'),
      require.resolve('babel-preset-react-app'),
      [
        require.resolve('@babel/preset-env'),
        {
          useBuiltIns: 'usage',
          targets: {
            browsers: ['last 2 versions'],
            node: 'current',
          },
        },
      ],
      require.resolve('@babel/preset-stage-2'),
    ],
  }
}
