// @flow
import { debugWithPackageName } from '@nod/debug-with-package-name'
import { __, curryN, type, tap, pipe as pipeRamda } from 'ramda'
import { Nothing } from 'sanctuary'
import type { MapType, RecordOf } from 'immutable'
export type Primitive =
  | string
  | boolean
  | number
  | Symbol
  | Object
  | Array<Primitive>
  | Promise<any>
  | Function
  | typeof Nothing

export const valueOrDefaultValue = (value: any, defaultValue: any) =>
  value !== undefined ? value : defaultValue

export const pipe = (...args: Array<Function>): Function => (
  value: Primitive
): Primitive => pipeRamda(...args)(value)

export const createNumberSequence = (length: number): Array<*> => [
  ...Array(length).keys(),
]

export const random = (max: number = 9999, min: number = 1): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

// eslint-disable-next-line fp/no-nil, better/explicit-return
export const thrower = (error: Error) => {
  throw error // eslint-disable-line fp/no-throw
}

export const compareIntegers = (a: number, b: number): number =>
  a > b ? -1 : b > a ? 1 : 0

export const objectMap = (objectToIterate: Object, fn: Function): Object =>
  Object.entries(objectToIterate).reduce(
    (accumulator, [key: string | number, value: any]) => ({
      ...accumulator,
      ...{
        [key]: fn(value, key),
      },
    }),
    objectToIterate
  )

export const objectWithBooleansFromStrings = (
  objectToIterate: Object
): Object =>
  objectMap(
    objectToIterate,
    pipeRamda(
      // eslint-disable-next-line fp/no-nil
      value => (value === 'true' ? true : undefined),
      // eslint-disable-next-line fp/no-nil
      value => (value === 'false' ? false : undefined)
    )
  )

export const objectWithoutUndefinedValues = (objectToIterate: Object): Object =>
  Object.entries(objectToIterate).reduce(
    (accumulator, [key, value]) =>
      value === undefined
        ? accumulator
        : {
            ...accumulator,
            ...{ [key]: value },
          },
    {}
  )

export const arrayToObjectEntries = (
  entry: Array<*>,
  formatter: Function = (value: any, key: string | number) => ({
    [key]: value,
  })
) =>
  entry.reduce(
    (accumulator, next, key) => ({
      ...accumulator,
      ...formatter(next, key),
    }),
    formatter(entry[0], 0)
  )

export const objectFilterKeys = (object: Object, filter: Function): Object =>
  Object.keys(object)
    .filter(filter)
    .reduce(
      (object, key) => ({
        ...object,
        [key]: object[key],
      }),
      {}
    )

export const clone = (array: Array<any>): Array<any> => [...array]

export const push = (array: Array<any>): Function => (
  ...elements
): Array<any> => [...array, ...elements]

export const pop = (array: Array<any>): Array<any> => array.slice(0, -1)

export const unshift = (array: Array<any>): Function => (
  element: any
): Array<any> => [element, ...array]

export const shift = (array: Array<any>): Array<any> => array.slice(1)

export const sort = (fn: Function): Function => (
  array: Array<any>
): Array<any> => [...array]

//eslint-disable-next-line fp/no-mutating-methods
export const reverse = (array: Array<any>): Array<any> => clone(array).reverse()

export const remove = (array: Array<any>): Function => (
  i: number
): Array<any> =>
  //eslint-disable-next-line fp/no-mutating-methods
  clone(array).splice(i, 1)

export const splice = (array: Array<any>): Function => (
  position: number,
  amount: number
  //eslint-disable-next-line fp/no-mutating-methods
) => clone(array).splice(position, amount)

export const debugReducer = (prefix: ?string = '') => (
  key: string | number,
  action: any,
  debugWithName: Function = debugWithPackageName(prefix)
) => debugWithName(`${key}`.concat(' %O'), action)

const finalDebugWithoutCurry = (
  prefix: string = '',
  description: string | number = ' %O',
  value: Primitive = Nothing
) => tap(value => debugWithPackageName(prefix)(description, value))(value)

const finalDebug = curryN(3, finalDebugWithoutCurry)

const debugWithoutCurry = (description?: string | number = '', value: any) =>
  finalDebugWithoutCurry('', description, value)

export const debug = curryN(2, debugWithoutCurry)

export const debugFactory = (prefix: string): Primitive =>
  finalDebug(prefix, __, __)

export type ImmutableState = MapType | RecordOf<any>
export const reducer = (...reducers: Array<Array<any>>): Function => (
  state: ImmutableState,
  reducerDebug?: Function = debugReducer('reducer')
): any =>
  [...reducers].reduce(
    (currentState: ImmutableState, [key: string | number, action: Primitive]) =>
      pipe(
        (action: Primitive): Primitive => action,
        (action: Primitive): any =>
          type(action) === 'Function' ? action(currentState) : action,
        (action: any): Primitive =>
          typeof action === 'undefined' ? Nothing : action,
        tap(action => reducerDebug(key, action)),
        action => currentState.set(key, action)
      )(action),
    state
  )
