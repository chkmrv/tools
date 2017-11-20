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
  "rules": require('./chantelle-rules')
}
