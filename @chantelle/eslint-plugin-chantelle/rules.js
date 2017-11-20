const pluginsDependencies = require('./plugins-dependencies')

const rules = pluginsDependencies.reduce((rules, pluginName) => {

  const plugin = require(`eslint-plugin-${ pluginName }`) // eslint-disable-line global-require, import/no-dynamic-require
  const result = Object.assign(rules)

  Object.keys(plugin.rules)
    .forEach(ruleName => {
      result[`${ pluginName }/${ ruleName }`] = plugin.rules[ruleName]
    })

  return result
}, {})

module.exports = rules //eslint-disable-line
