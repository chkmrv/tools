/* eslint fp/no-unused-expression:0 */

import test from 'ava'
import { runBuild, runGulpTask, runStart, runTest } from './'

test('exports correct types', t =>
  [
    [runBuild, 'function'],
    [runGulpTask, 'function'],
    [runStart, 'function'],
    [runTest, 'function'],
  ].map(([exported, type]) => t.is(typeof exported, type)))
