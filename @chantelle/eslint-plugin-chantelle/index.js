const prettier = require('eslint-config-prettier')
const cleanjs = require('eslint-config-cleanjs')
const createConfig = require('./create-config')
const chantelleRules = require('./chantelle-rules')
const rules = require('./rules')

module.exports = { //eslint-disable-line
  configs: {
    legacy: createConfig(prettier),
    chantelle: createConfig(cleanjs),
  },
  rules: Object.assign(
    {},
    rules,
    chantelleRules ) }
