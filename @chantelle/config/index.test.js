/* eslint fp/no-unused-expression:0 */

import test from 'ava'
import {
  env,
  paths,
  jestCssTransform,
  jestFileTransform,
  getClientEnvironment,
  webpackDevServerConfig,
  webpackProductionConfig,
  webpackDevelopmentConfig,
} from './'

test('exports correct types', t =>
  [
    [env, 'object'],
    [paths, 'object'],
    [jestCssTransform, 'function'],
    [jestFileTransform, 'function'],
    [getClientEnvironment, 'function'],
    [webpackDevServerConfig, 'function'],
    [webpackProductionConfig, 'function'],
    [webpackDevelopmentConfig, 'function'],
  ].map(([exported, type]) => t.is(typeof exported, type)))
