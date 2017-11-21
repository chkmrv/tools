#!/usr/bin/env babel-node

import runGulp from '../run-gulp'
import { argv } from 'yargs'
import { thrower } from '@chantelle/util'

const task = argv._[0]

export default !task
  ? thrower(Error('No task provided'))
  : runGulp(task)
