import gulp from 'gulp'
import shell from 'shelljs'
import { resolve } from 'path'
import { thrower } from '@chantelle/util'
import '../gulpfile.babel'

const cwd = process.cwd()
const { nodes: tasks } = gulp.tree()

export const runGulpTask = task =>
  tasks.includes(task)
    ? gulp.series(task)({ cwd })
    : thrower(Error(`${task} not found`))

export default runGulpTask
