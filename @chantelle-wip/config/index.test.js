/* eslint fp/no-unused-expression:0, fp/no-nil:0, fp/no-unused-expression:0, better/explicit-return:0 */

import {
  env,
  paths,
  jestCssTransform,
  jestFileTransform,
  getClientEnvironment,
  webpackDevServerConfig,
  webpackProductionConfig,
  webpackDevelopmentConfig,
} from './src'

describe('@chantelle/config', () => {
  test('exports correct types', () => {
    ;[
      [env, 'object'],
      [paths, 'object'],
      [jestCssTransform, 'function'],
      [jestFileTransform, 'function'],
      [getClientEnvironment, 'function'],
      [webpackDevServerConfig, 'function'],
      [webpackProductionConfig, 'function'],
      [webpackDevelopmentConfig, 'function'],
    ].map(([exported, type]) => expect(typeof exported).toBe(type))
  })
})
