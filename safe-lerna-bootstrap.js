/* eslint import/no-commonjs:0 */

const { unlinkSync, existsSync, openSync, closeSync } = require('fs')
const childProcess = require('child_process')
const { tmpdir } = require('os')
const { join } = require('path')
const { exit, argv: [bin, path, ...argv] } = require('process')
const LOCK_FILE = 'LERNA_BOOTSTRAP_LOCK_FILE.lock'
const lockFilePath = join(tmpdir(), LOCK_FILE)
const touchLockFile = () => closeSync(openSync(lockFilePath, 'w'))
const removeLockFile = () => unlinkSync(lockFilePath, 'w')
const checkLockFile = () => existsSync(lockFilePath)
const check = () =>
  checkLockFile()
    ? console.warn(Error(`${lockFilePath} exists, exiting`)) ||
      (exit(0) && false)
    : true
const printLockfile = () =>
  console.info(`Lerna Bootstrap Lockfile Path: ${lockFilePath}`)
const onError = error =>
  [error => console.error(error), removeLockFile, () => exit(1)].map(fn =>
    fn(error)
  )
const onSuccess = () =>
  [
    removeLockFile,
    () => console.info('Safely bootstrapped.'),
    () => exit(0),
  ].map(fn => fn())
const bootstrap = () =>
  childProcess
    .spawn('lerna', ['bootstrap'].concat(argv), { stdio: 'inherit' })
    .on('exit', error => (error ? onError(error) : onSuccess()))
const takeLast = array => array.slice(0, -1)
const run = () =>
  [printLockfile, check, touchLockFile, bootstrap].map(fn => fn())
// eslint-disable-next-line fp/no-mutation
module.exports = takeLast(run())
