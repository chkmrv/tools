/* eslint fp/no-mutation:0, import/no-commonjs:0 */

process.env.BABEL_ENV = process.env.BABEL_ENV || "development";

module.exports = {
  plugins: [
    [
      require.resolve("babel-plugin-flow-runtime"),
      {
        assert: true,
        annotate: true
      }
    ],
    require.resolve("babel-plugin-transform-decorators-legacy"),
    require.resolve("babel-plugin-add-module-exports")
  ],
  presets: [
    require.resolve("babel-preset-flow-runtime"),
    require.resolve("babel-preset-stage-2"),
    require.resolve("babel-preset-react"),
    require.resolve("babel-preset-react-app"),
    [
      require.resolve("babel-preset-env"),
      {
        useBuiltIns: true,
        targets: {
          browsers: ["last 2 versions"],
          node: "current"
        }
      }
    ]
  ]
};
