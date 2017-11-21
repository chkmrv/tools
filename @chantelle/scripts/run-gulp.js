import shell from 'shelljs'
import gulp from 'gulp'
import { resolve } from 'path'
import { thrower } from '@chantelle/util'
import './gulpfile.babel'

const cwd = process.cwd()
const { nodes: tasks } = gulp.tree()

export default task =>
  tasks.includes(task)
    ? gulp.series(task)({cwd})
    : thrower(Error(`${task} not found`))
