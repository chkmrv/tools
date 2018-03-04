/* eslint fp/no-unused-expression:0, fp/no-nil:0, better/explicit-return:0 */

import test from 'ava'
import { configs, chantelle, legacy, chantelleCommonJs } from './'

const checkArrayOfObjects = t => arrayOfObjects =>
  arrayOfObjects.map(arrayOfObjects => t.is(typeof arrayOfObjects, 'object'))

test('exports objects', t =>
  checkArrayOfObjects(t)([configs, chantelle, legacy, chantelleCommonJs]))

test('exports objects 2', t => {
  ;(({ chantelle, legacy, chantelleCommonJs }) =>
    checkArrayOfObjects(t)([chantelle, legacy, chantelleCommonJs]))(configs)
})
