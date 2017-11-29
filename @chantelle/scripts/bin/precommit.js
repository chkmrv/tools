#!/usr/bin/env node

/* eslint fp/no-mutation:0,import/no-commonjs:0 */

const runGulp = require('../build/run-gulp')
module.exports = runGulp('precommit')
