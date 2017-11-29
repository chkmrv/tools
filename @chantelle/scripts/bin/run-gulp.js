#!/usr/bin/env node

/* eslint fp/no-mutation:0,import/no-commonjs:0 */

const { argv } = require('yargs')
const runGulp = require('../build/run-gulp')
const { thrower } = require('@chantelle/util')

const task = argv._[0]

module.exports = !task
  ? thrower(Error('No task provided'))
  : runGulp(task)
