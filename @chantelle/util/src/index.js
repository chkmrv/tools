// @flow
import { debugWithPackageName } from '@nod/debug-with-package-name'
import { pipe, type, tap } from 'ramda'

import type { Map as MapType } from 'immutable'

export const createNumberSequence = (length: number): Array<*> => [
  ...Array(length).keys(),
]

export const random = (max: number = 9999, min: number = 1): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const valueOrDefaultValue = (value: any, defaultValue: any) =>
  value !== undefined ? value : defaultValue

// eslint-disable-next-line fp/no-nil, better/explicit-return
export const thrower = (error: Error) => {
  throw error // eslint-disable-line fp/no-throw
}

// export const pipe = (...functions: Array<Function>): Function => (arg: any) =>
//   functions.reduce(
//     (value: any, fn: Function): any => valueOrDefaultValue(fn(value), value),
//     arg,
//   )

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
    objectToIterate,
  )

export const objectWithBooleansFromStrings = (
  objectToIterate: Object,
): Object =>
  objectMap(
    objectToIterate,
    pipe(
      // eslint-disable-next-line fp/no-nil
      value => (value === 'true' ? true : undefined),
      // eslint-disable-next-line fp/no-nil
      value => (value === 'false' ? false : undefined),
    ),
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
    {},
  )

export const debug = (variable?: any, description?: string = ' %O'): any =>
  tap(variable => debugWithPackageName()(description, variable), variable)

export const arrayToObjectEntries = (
  entry: Array<*>,
  formatter: Function = (value: any, key: string | number) => ({
    [key]: value,
  }),
) =>
  entry.reduce(
    (accumulator, next, key) => ({
      ...accumulator,
      ...formatter(next, key),
    }),
    formatter(entry[0], 0),
  )

export const objectFilterKeys = (object: Object, filter: Function): Object =>
  Object.keys(object)
    .filter(filter)
    .reduce(
      (object, key) => ({
        ...object,
        [key]: object[key],
      }),
      {},
    )

export const clone = (array: Array<any>): Array<any> => [...array]

export const push = (array: Array<any>): Function => (
  ...elements
): Array<any> => [...array, ...elements]

export const pop = (array: Array<any>): Array<any> => array.slice(0, -1)

export const unshift = (array: Array<any>): Function => (
  element: any,
): Array<any> => [element, ...array]

export const shift = (array: Array<any>): Array<any> => array.slice(1)

export const sort = (fn: Function): Function => (
  array: Array<any>,
): Array<any> => [...array]

//eslint-disable-next-line fp/no-mutating-methods
export const reverse = (array: Array<any>): Array<any> => clone(array).reverse()

export const remove = (array: Array<any>): Function => (
  i: number,
): Array<any> =>
  //eslint-disable-next-line fp/no-mutating-methods
  clone(array).splice(i, 1)

export const splice = (array: Array<any>): Function => (
  position: number,
  amount: number,
  //eslint-disable-next-line fp/no-mutating-methods
) => clone(array).splice(position, amount)

//eslint-disable-next-line fp/no-mutating-methods
export const takeLast = (array: Array<any>): any => clone(array).pop()

export const debugReducer = (prefix?: string = '') => (
  key: string | number,
  action: any,
  debug = debugWithPackageName(prefix),
) => debug(key.concat(' %O'), action)

export const reducer = (...reducers: Array<Array<any>>): Function => (
  // state: MapType,
  state,
  debug = debugReducer(),
  // ): MapType =>
): any =>
  [...reducers].reduce(
    (currentState, [key: string | number, action: any]) =>
      currentState.set(
        key,
        pipe(
          (action: any) =>
            type(action) === 'Function' ? action(currentState) : action,
          (action: any) => tap(action => debug(key, action), action),
        )(action),
      ),
    state,
  )
