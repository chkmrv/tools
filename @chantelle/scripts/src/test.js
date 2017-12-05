/* eslint fp/no-mutating-methods:0, better/no-new:0, no-console:0, fp/no-unused-expression:0, better/no-ifs:0 */
import jest from 'jest'
import { getClientEnvironment } from '@chantelle/config'
import { thrower } from '@chantelle/util'

export const runTest = () => {
  getClientEnvironment()

  const { CI } = process.env

  // Do this as the first thing so that any code reading it knows the right env.
  // eslint-disable-next-line fp/no-mutation
  process.env = {
    ...process.env,
    BABEL_ENV: 'test',
    NODE_ENV: 'test',
    PUBLIC_URL: '',
  }

  // Makes the script crash on unhandled rejections instead of silently
  // ignoring them. In the future, promise rejections that are not handled will
  // terminate the Node.js process with a non-zero exit code.
  process.on('unhandledRejection', thrower)

  const argv = process.argv.slice(2)

  // Watch unless on CI or in coverage mode
  if (!CI && argv.indexOf('--coverage') < 0) argv.push('--watch')

  return jest.run(argv)
}

export default runTest
