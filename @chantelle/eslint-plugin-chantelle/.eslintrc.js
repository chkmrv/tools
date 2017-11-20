module.exports = {
  "extends": [
    "cleanjs",
    "react-app"
  ],
  "plugins": [
    "flowtype",
    "babel",
    "react"
  ],
  "rules": Object.assign(require('./chantelle-rules'), {
    'import/no-commonjs': 0
  })
}
