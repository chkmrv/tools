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
  [],
)

export const chantelleRules = {
  //prettier
  'prettier/prettier': [
    2,
    {
      singleQuote: true,
      trailingComma: 'all',
      parser: 'flow',
      semi: false,
    },
  ],

  //fp
  'fp/no-rest-parameters': 0,

  //react
  'react/no-unused-prop-types': 1,
  'react/jsx-uses-vars': 1,
  'react/jsx-uses-react': 1,

  //babel
  'babel/object-curly-spacing': [1, 'always'],

  'array-callback-return': 2,
  'arrow-parens': [2, 'as-needed'],
  'comma-dangle': [2, 'always-multiline'],
  'comma-style': [
    2,
    'last',
    {
      exceptions: { ArrayExpression: true, ObjectExpression: true },
    },
  ],

  'jsx-quotes': 2,
  'key-spacing': [
    2,
    {
      beforeColon: false,
      afterColon: true,
    },
  ],

  'newline-before-return': 0,
  'no-alert': 0,
  'no-case-declarations': 1,
  'no-console': [2, { allow: ['warn', 'error', 'info'] }],
  'no-dupe-class-members': 2,
  'no-else-return': 0,
  'no-irregular-whitespace': 2,
  'no-nested-ternary': 0,
  'no-param-reassign': 0,
  'no-restricted-globals': 0,
  'no-shadow': 0, // redux requires unbound and bound in same file
  'no-multi-spaces': 0,
  'no-multiple-empty-lines': 0,
  'no-undef': 2,
  'no-unused-vars': [1, { varsIgnorePattern: 'React', args: 'none' }],
  'no-use-before-define': 0,
  'no-useless-escape': 2,
  'new-cap': 0,
  'object-curly-spacing': [1, 'always'],
  'object-shorthand': 2,
  'padded-blocks': 0,
  quotes: [2, 'single'],
  'spaced-comments': 0,
  'space-before-function-paren': [2, 'never'],
  'space-in-parens': [0, 'always', { exceptions: ['{}', 'empty'] }],
  'no-delete-var': 1,
  'no-self-assign': 2,
  'no-return-await': 2,
  'no-loop-func': 2,
  'no-unreachable': 2,
  'prefer-const': 0,
  'no-await-in-loop': 1,
  semi: [1, 'never'],
  'max-statements-per-line': [2, { max: 2 }],
  'array-bracket-spacing': [0, 'always'],
  'space-before-blocks': [2, 'always'],
  'max-nested-callbacks': [2, { max: 3 }],
  'no-debugger': 1,
}

export const propsToPick = ['env', 'parserOptions', 'root', 'settings']

export const getConfigBase = () => ({
  parser: 'babel-eslint',
  extends: ['plugin:flowtype/recommended', 'plugin:jest/recommended'],
  plugins: [
    // '@chantelle/chantelle',
    'jest',
    'babel',
    'flowtype',
    'fp',
    'import',
    'jsx-a11y',
    'react',
    'better',
    'prettier',
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
    {},
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
