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
  'prettier/prettier': [
    2,
    {
      singleQuote: true,
      trailingComma: 'all',
      parser: 'flow',
      semi: false,
    },
  ],

  'fp/no-rest-parameters': 0,

  'react/no-deprecated': 2,
  'react/no-did-mount-set-state': 2,
  'react/no-did-update-set-state': 2,
  'react/no-direct-mutation-state': 2,
  'react/no-is-mounted': 2,
  'react/no-multi-comp': 0,
  'react/no-string-refs': 0,
  'react/no-unknown-property': 1,
  'react/require-extension': 0,
  'react/prefer-es6-class': 1,
  'react/prop-types': 1,
  'react/sort-comp': 0,
  'react/sort-prop-types': 0,
  'react/prefer-stateless-function': 1,
  'react/react-in-jsx-scope': 1,
  'react/self-closing-comp': 1,

  'babel/new-cap': 0,
  'babel/object-curly-spacing': [1, 'always'],

  'react/jsx-boolean-value': [1, 'never'],
  'react/jsx-closing-bracket-location': 2,
  'react/jsx-curly-spacing': [1, 'always'],
  'react/jsx-equals-spacing': 1,
  'react/jsx-handler-names': 1,
  'react/jsx-indent-props': [1, 2],
  'react/jsx-indent': 1,
  'react/jsx-key': 2,
  'react/jsx-max-props-per-line': [1, { maximum: 1 }],
  'react/jsx-no-bind': 0,
  'react/jsx-no-duplicate-props': 2,
  'react/jsx-no-literals': 0,
  'react/jsx-no-undef': 2,
  'react/jsx-pascal-case': 2,
  'react/jsx-sort-props': 0,
  'react/jsx-tag-spacing': 2,
  'react/jsx-uses-vars': 2,

  // 'flowtype/define-flow-type': 1,
  // 'flowtype/require-parameter-type': 'always',
  // 'flowtype/require-return-type': 2,
  // 'flowtype/space-after-type-colon': 0,
  // 'flowtype/space-before-type-colon': 0,
  // 'flowtype/type-id-match': 0,
  // 'flowtype/use-flow-type': 1,
  // 'flowtype/valid-syntax': 2,

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
  // 'computed-property-spacing': [1, 'always'],
  curly: 0,
  eqeqeq: [2, 'smart'],
  'generator-star-spacing': [2, 'both'],
  'id-length': 0,
  // indent: [2, 2, { SwitchCase: 1 }],
  'jsx-quotes': 2,
  'key-spacing': [
    2,
    {
      beforeColon: false,
      afterColon: true,
    },
  ],
  // 'keyword-spacing': [
  //   2,
  //   {
  //     before: false,
  //     after: false,
  //     overrides: {
  //       if: { after: false, before: false },
  //       function: { after: false, before: false },
  //       for: { after: false, before: false },
  //       switch: { after: false, before: false },
  //       catch: { after: false, before: false },
  //     },
  //   },
  // ],
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
  'new-cap': [2, { capIsNewExceptions: ['mongoose.Schema'] }],
  'object-curly-spacing': [1, 'always'],
  'object-shorthand': 2,
  'padded-blocks': 0,
  quotes: [2, 'single'],
  'spaced-comments': 0,
  'space-before-function-paren': [2, 'never'],
  'space-in-parens': [0, 'always', { exceptions: ['{}', 'empty'] }],
  'react/no-unused-prop-types': 1,
  // 'space-unary-ops': [
  //   2,
  //   {
  //     words: true,
  //     nonwords: true,
  //     overrides: { '++': false, '+': false, '--': false, '-': false },
  //   },
  // ],
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
  // 'template-curly-spacing': [2, 'always'],
  // 'max-len': [1, 80, 2],
  'max-nested-callbacks': [2, { max: 3 }],
  'no-debugger': 1,
}

export const propsToPick = ['env', 'parserOptions', 'root', 'settings']

export const getConfigBase = () => ({
  parser: 'babel-eslint',
  extends: ['plugin:flowtype/recommended', 'plugin:react/recommended'],
  plugins: [
    // '@chantelle/chantelle',
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
