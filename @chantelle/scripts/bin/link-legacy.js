#!/usr/bin/env node

/* eslint fp/no-mutation:0,import/no-commonjs:0 */

const { runGulpTask } = require('../')
module.exports = runGulpTask('link-legacy')
