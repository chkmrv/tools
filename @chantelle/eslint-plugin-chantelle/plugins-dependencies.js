const pkg = require('./package.json')
const reduce = require('lodash/reduce')

const plugins = reduce(pkg.dependencies, (plugins, version, dependency) => {
  if (dependency.indexOf('eslint-plugin') === 0) {
    plugins.push(dependency.replace('eslint-plugin-', ''))
  }
  return plugins
}, [])

module.exports = plugins //eslint-disable-line
