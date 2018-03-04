/* eslint fp/no-mutating-methods:0, fp/no-mutation:0, fp/no-let:0, better/no-new:0, no-console:0, fp/no-unused-expression:0, better/no-ifs:0 */
import cleanjs from 'eslint-config-cleanjs'
import pick from 'lodash/pick'
import merge from 'lodash/merge'
import pkg from '../package.json'
import reduce from 'lodash/reduce'

export const pluginsDependencies = reduce(
  pkg.dependencies,
  (plugins, version, dependency) => {
    if (dependency.indexOf('eslint-plugin') === 0) {
      plugins.push(dependency.replace('eslint-plugin-', ''))
    }
    return plugins
  },
  []
)

export const chantelleRules = {
  //prettier
  'prettier/prettier': [
    2,
    {
      singleQuote: true,
      trailingComma: 'es5',
      parser: 'flow',
      semi: false,
    },
  ],

  //fp
  'fp/no-rest-parameters': 0,

  //better
  'better/no-new': 0,

  //react
  'react/no-unused-prop-types': 1,

  'array-callback-return': 2,
  'arrow-parens': [2, 'as-needed'],

  'new-cap': 0,
  'key-spacing': [
    2,
    {
      beforeColon: false,
      afterColon: true,
    },
  ],
}

export const propsToPick = ['env', 'parserOptions', 'root', 'settings']

export const getConfigBase = () => ({
  parser: 'babel-eslint',
  extends: [
    'prettier',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
  ],
  plugins: [
    'prettier',
    '@chantelle/chantelle',
    'jest',
    'babel',
    'flowtype',
    'fp',
    'import',
    'jsx-a11y',
    'react',
    'better',
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

const isPluginRule = ruleName =>
  pluginsDependencies.some(plugin => ruleName.indexOf(`${plugin}/`) === 0)

const getConfigRules = config =>
  Object.keys(config && config.rules ? config.rules : {}).reduce(
    (rules, ruleName) => {
      const result = Object.assign({}, rules)
      const key = isPluginRule(ruleName) ? `${ruleName}` : ruleName

      result[key] = config.rules[ruleName]

      return result
    },
    {}
  )

const extendConfig = (config, ext) => {
  let extension = ext

  if (typeof extension === 'string') {
    extension = require(ext)
  }

  const extensionRules = {
    rules: Object.assign({}, getConfigRules(extension), chantelleRules),
  }

  return merge(config, pick(extension, propsToPick), extensionRules)
}

export const createConfig = extension => {
  let config = extendConfig(getConfigBase(), extension)

  if (extension.extends && extension.extends.length) {
    config = extension.extends.reduce(extendConfig, config)
  }

  return config
}

const emptyConfig = Object.assign({}, createConfig({}))
const cleanJsConfig = createConfig(cleanjs)
const { parserOptions, rules } = cleanJsConfig

export const legacy = emptyConfig
export const chantelle = cleanJsConfig
export const chantelleCommonJs = {
  ...cleanJsConfig,
  parserOptions: {
    ...parserOptions,
    sourceType: 'script',
  },
  rules: {
    ...rules,
    'import/no-commonjs': 0,
    'fp/no-mutation': 0,
  },
}

export const configs = { legacy, chantelle, chantelleCommonJs }
export default { legacy, chantelle, chantelleCommonJs }
