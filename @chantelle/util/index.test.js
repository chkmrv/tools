/* eslint fp/no-unused-expression:0 */

import test from 'ava'
import {
  createNumberSequence,
  random,
  valueOrDefaultValue,
  thrower,
  pipe,
  compareIntegers,
  objectMap,
  objectWithBooleansFromStrings,
  objectWithoutUndefinedValues,
  getParentModule,
  debugFactory,
  debug,
  arrayToObjectEntries,
  objectFilterKeys,
} from './'

test('exports correct types', t =>
  [
    [createNumberSequence, 'function'],
    [random, 'function'],
    [valueOrDefaultValue, 'function'],
    [thrower, 'function'],
    [pipe, 'function'],
    [compareIntegers, 'function'],
    [objectMap, 'function'],
    [objectWithBooleansFromStrings, 'function'],
    [objectWithoutUndefinedValues, 'function'],
    [getParentModule, 'function'],
    [debugFactory, 'function'],
    [debug, 'function'],
    [arrayToObjectEntries, 'function'],
    [objectFilterKeys, 'function'],
  ].map(([exported, type]) => t.is(typeof exported, type)))
