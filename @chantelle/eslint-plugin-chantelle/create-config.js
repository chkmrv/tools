const pick = require('lodash/pick')
const merge = require('lodash/merge')
const propsToPick = require('./props-to-pick')
const getConfigBase = require('./get-config-base')
const pluginsDependencies = require('./plugins-dependencies')

const isPluginRule = ruleName => pluginsDependencies
  .some(plugin => ruleName.indexOf(`${ plugin }/`) === 0)

//
const getConfigRules = config => Object
  .keys(config.rules)
  .reduce((rules, ruleName) => {
    const result = Object.assign({}, rules)
    const key = isPluginRule(ruleName) ? `${ ruleName }` : ruleName

    result[key] = config.rules[ruleName]

    return result
  }, {})

const extendConfig = (config, ext) => {
  let extension = ext

  if (typeof extension === 'string') {
    extension = require(ext) // eslint-disable-line global-require, import/no-dynamic-require
  }

  const extensionRules = { rules: getConfigRules(extension) }

  return merge(config, pick(extension, propsToPick), extensionRules)
}

const createConfig = extension => {
  let config = extendConfig(getConfigBase(), extension)

  if (extension.extends && extension.extends.length) {
    config = extension.extends.reduce(extendConfig, config)
  }

  return config
}

module.exports = createConfig
