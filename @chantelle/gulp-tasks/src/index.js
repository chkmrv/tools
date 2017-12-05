/* eslint fp/no-unused-expression:0 */

import { join } from 'path'
import gulpLoadPlugins from 'gulp-load-plugins'
import { paths } from '@chantelle/config'

export const tasks = gulp => {
  const { config, util, vendor, appDirectory } = paths
  const { shell, eslint, lebab, print, util: { log } } = gulpLoadPlugins()

  const linkFolder = folder =>
    gulp
      .src(appDirectory)
      .pipe(shell([`npm link ${folder}`]))
      .on('error', log)

  gulp.task('link-config', () => linkFolder(config))

  gulp.task('link-util', () => linkFolder(util))

  gulp.task('link-vendor', () => linkFolder(vendor))

  gulp.task(
    'link-legacy',
    gulp.parallel('link-util', 'link-config', 'link-vendor'),
  )

  gulp.task('postinstall-legacy', gulp.parallel('link-legacy'))

  const pathJs = './'
  const patternJs = join('**/*.js')
  const patternJsSrc = [join(pathJs, patternJs), '!./node_modules/**/*.js']
  const patternJsDest = join(pathJs)

  gulp.task('lint', () =>
    gulp
      .src(patternJsSrc)
      .pipe(print())
      .pipe(eslint())
      .on('error', log),
  )

  gulp.task('lint-fix', () =>
    gulp
      .src(patternJsSrc)
      .pipe(print())
      .pipe(eslint({ fix: true }))
      .pipe(gulp.dest(patternJsDest))
      .on('error', log),
  )

  gulp.task('lebab', () =>
    gulp
      .src(patternJsSrc)
      .pipe(print())
      .pipe(lebab())
      .pipe(gulp.dest(patternJsDest))
      .on('error', log),
  )

  gulp.task('fix-syntax', gulp.parallel('lebab', 'lint-fix'))

  gulp.task('precommit', gulp.parallel('fix-syntax'))

  gulp.task(
    'build-translations',
    shell.task('babel-node ./scripts/translations'),
  )

  gulp.task('start-dev-server', shell.task('babel-node ./scripts/start'))

  gulp.task('start-build-script', shell.task('babel-node ./scripts/build'))

  gulp.task(
    'start-legacy',
    gulp.series('link-legacy', 'build-translations', 'start-dev-server'),
  )

  gulp.task(
    'build-legacy',
    gulp.series('link-legacy', 'build-translations', 'start-build-script'),
  )

  gulp.task('build', gulp.series('start-build-script'))

  // gulp.task('default', gulp.series('start'))

  return gulp
}

export default tasks
