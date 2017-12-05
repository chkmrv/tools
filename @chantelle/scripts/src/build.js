/* eslint fp/no-mutation:0, better/no-new:0, no-console:0, fp/no-unused-expression:0, better/no-ifs:0 */
import path from 'path'
import chalk from 'chalk'
import fs from 'fs-extra'
import webpack from 'webpack'
import config from '@chantelle/config/getWebpackProduction'
import { paths } from '@chantelle/config'
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles'
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'
import printHostingInstructions from 'react-dev-utils/printHostingInstructions'
import FileSizeReporter from 'react-dev-utils/FileSizeReporter'
import printBuildError from 'react-dev-utils/printBuildError'
import { debug, extendEnvironmentVariables, thrower } from '@chantelle/util'

const {
  yarnLockFile,
  appHtml,
  appIndexJs,
  publicUrl,
  appPackageJson,
  appBuild,
  appPublic,
} = paths

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  //eslint-disable-next-line no-console
  console.log('Creating an optimized production build...')

  const compiler = webpack(config)
  return new Promise((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err) return reject(err)
      const messages = formatWebpackMessages(stats.toJson({}, true))
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) messages.errors.length = 1
        return reject(Error(messages.errors.join('\n\n')))
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        //eslint-disable-next-line no-console
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n',
          ),
        )
        return reject(Error(messages.warnings.join('\n\n')))
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      })
    }),
  )
}

function copyPublicFolder() {
  return fs.copySync(appPublic, appBuild, {
    dereference: true,
    filter: file => file !== appHtml,
  })
}

export const runBuild = () => {
  // Do this as the first thing so that any code reading it knows the right env.
  extendEnvironmentVariables({
    BABEL_ENV: 'production',
    NODE_ENV: 'production',
  })

  // Makes the script crash on unhandled rejections instead of silently
  // ignoring them. In the future, promise rejections that are not handled will
  // terminate the Node.js process with a non-zero exit code.
  process.on('unhandledRejection', thrower)

  // Ensure environment variables are read.
  require('@chantelle/config')

  const measureFileSizesBeforeBuild =
    FileSizeReporter.measureFileSizesBeforeBuild
  const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild
  const useYarn = fs.existsSync(yarnLockFile)

  // These sizes are pretty large. We'll warn for bundles exceeding them.
  const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
  const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

  // Warn and crash if required files are missing
  if (!checkRequiredFiles([appHtml, appIndexJs])) {
    process.exit(1)
  }

  debug('build starting')

  // First, read the current file sizes in build directory.
  // This lets us display how much they changed later.
  return measureFileSizesBeforeBuild(appBuild)
    .then(previousFileSizes => {
      // Remove all content but keep the directory so that
      // if you're in it, you don't end up in Trash
      fs.emptyDirSync(appBuild)
      // Merge with the public folder
      copyPublicFolder()
      // Start the webpack build
      return build(previousFileSizes)
    })
    .then(
      ({ stats, previousFileSizes, warnings }) => {
        if (warnings.length) {
          //eslint-disable-next-line no-console
          console.log(chalk.yellow('Compiled with warnings.\n'))
          //eslint-disable-next-line no-console
          console.log(warnings.join('\n\n'))
          //eslint-disable-next-line no-console
          console.log(
            `\nSearch for the ${chalk.underline(
              chalk.yellow('keywords'),
            )} to learn more about each warning.`,
          )
          //eslint-disable-next-line no-console
          console.log(
            `To ignore, add ${chalk.cyan(
              '// eslint-disable-next-line',
            )} to the line before.\n`,
          )
        } else {
          //eslint-disable-next-line no-console
          console.log(chalk.green('Compiled successfully.\n'))
        }

        //eslint-disable-next-line no-console
        console.log('File sizes after gzip:\n')
        printFileSizesAfterBuild(
          stats,
          previousFileSizes,
          appBuild,
          WARN_AFTER_BUNDLE_GZIP_SIZE,
          WARN_AFTER_CHUNK_GZIP_SIZE,
        )

        const appPackage = require(appPackageJson)
        const publicPath = config.output.publicPath
        const buildFolder = path.relative(process.cwd(), appBuild)
        printHostingInstructions(
          appPackage,
          publicUrl,
          publicPath,
          buildFolder,
          useYarn,
        )

        return {
          appPackage,
          publicUrl,
          publicPath,
          buildFolder,
          useYarn,
        }
      },
      err => [
        //eslint-disable-next-line no-console
        console.error(chalk.red('Failed to compile.\n')),
        printBuildError(err),
        process.exit(1),
      ],
    )
}
