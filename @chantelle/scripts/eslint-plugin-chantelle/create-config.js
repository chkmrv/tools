import pick from 'lodash/pick'
import merge from 'lodash/merge'
import propsToPick from './props-to-pick'
import getConfigBase from './get-config-base'
import pluginsDependencies from './plugins-dependencies'
import { debug } from '@chantelle/util'

const isPluginRule = ruleName => pluginsDependencies
  .some(plugin => ruleName.indexOf(`${ plugin }/`) === 0)

//
const getConfigRules = config => Object
  .keys(config.rules)
  .reduce((rules, ruleName) => {
    const result = Object.assign({}, rules)
    const key = isPluginRule(ruleName) ? `chantelle/${ ruleName }` : ruleName

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

  return debug(config, 'config %O')
}

export default createConfig
