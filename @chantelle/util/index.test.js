/* eslint
  fp/no-nil:0,  
  fp/no-unused-expression:0,
  fp/no-unused-expression:0,
  better/explicit-return:0
*/

import { Map } from 'immutable'
import { tap, pipe } from 'ramda'
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
} from './src'

describe('@chantelle/util', () => {
  it('exports correct types', () => {
    ;[
      [debug, 'function'],
      [createNumberSequence, 'function'],
      [random, 'function'],
      [valueOrDefaultValue, 'function'],
      [thrower, 'function'],
      [compareIntegers, 'function'],
      [objectMap, 'function'],
      [objectWithBooleansFromStrings, 'function'],
      [objectWithoutUndefinedValues, 'function'],
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
      [reducer, 'function'],
    ].map(([exported, type]) => expect(typeof exported).toBe(type))
  })

  it('reducer is working', () => {
    reducer(
      ['test', true],
      [
        'test',
        state => tap(test => expect(test).toBe(true), state.get('test')),
      ],
      ['blabla', 'bla'],
      ['test2', state => state.get('test')],
      [
        'test2',
        state =>
          tap(
            test2 => expect(test2).toBe(state.get('test')),
            state.get('test2')
          ),
      ]
    )(Map({ test: true }))
  })
})
