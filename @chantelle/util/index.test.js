/* eslint fp/no-unused-expression:0 */

import { Map } from 'immutable'
import { tap, pipe } from 'ramda'
import test from 'ava'
import {
  createNumberSequence,
  random,
  valueOrDefaultValue,
  thrower,
  compareIntegers,
  objectMap,
  objectWithBooleansFromStrings,
  objectWithoutUndefinedValues,
  getParentModule,
  debugFactory,
  debug,
  arrayToObjectEntries,
  objectFilterKeys,
  clone,
  push,
  pop,
  unshift,
  shift,
  sort,
  reverse,
  remove,
  splice,
  takeLast,
  reducer,
} from './'

test('exports correct types', t =>
  [
    [createNumberSequence, 'function'],
    [random, 'function'],
    [valueOrDefaultValue, 'function'],
    [thrower, 'function'],
    [compareIntegers, 'function'],
    [objectMap, 'function'],
    [objectWithBooleansFromStrings, 'function'],
    [objectWithoutUndefinedValues, 'function'],
    [debug, 'function'],
    [arrayToObjectEntries, 'function'],
    [objectFilterKeys, 'function'],
    [clone, 'function'],
    [push, 'function'],
    [pop, 'function'],
    [unshift, 'function'],
    [shift, 'function'],
    [sort, 'function'],
    [reverse, 'function'],
    [remove, 'function'],
    [splice, 'function'],
    [takeLast, 'function'],
    [reducer, 'function'],
  ].map(([exported, type]) => t.is(typeof exported, type)))

test('reducer is working', t =>
  reducer(
    ['test', true],
    ['test', state => tap(test => t.is(test, true), state.get('test'))],
    ['blabla', 'bla'],
    ['test2', state => state.get('test')],
    [
      'test2',
      state => tap(test2 => t.is(test2, state.get('test')), state.get('test2')),
    ],
  )(Map({ test: true })))
