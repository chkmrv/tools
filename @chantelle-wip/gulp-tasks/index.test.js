/* eslint fp/no-unused-expression:0 */

import test from 'ava'
import gulpTasks from './'

test('exports correct types', t =>
  [[gulpTasks, 'function']].map(([exported, type]) =>
    t.is(typeof exported, type)
  ))
