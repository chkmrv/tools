#!/usr/bin/env node

const { argv } = require('yargs')
const { thrower } = require('@chantelle/util')
const { runGulpTask } = require('../')

const task = argv._[0]

module.exports = !task ? thrower(Error('No task provided')) : runGulpTask(task)
