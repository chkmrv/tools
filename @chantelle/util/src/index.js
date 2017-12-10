// @flow
import debugFactoryWithName from '@nod/debug-with-package-name'

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

export const pipe = (...functions: Array<Function>): Function => (arg: any) =>
  functions.reduce(
    (value: any, fn: Function): any => valueOrDefaultValue(fn(value), value),
    arg,
  )

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

export const getParentModule = (): ?string =>
  // eslint-disable-next-line fp/no-nil
  module && module.parent ? module.parent : null

export const debugFactory = (additionalPrefix: ?string = ' %O'): Function =>
  debugFactoryWithName(getParentModule())

export const debug = (variable: ?any, description: ?string = ' %O'): any =>
  pipe(variable => debugFactory()(description, variable))(variable)

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

export const clone = (array: Array): Array => [...array]

export const push = (array: Array): Function => (...elements): Array => [
  ...array,
  ...elements,
]

export const pop = (array: Array): Array => array.slice(0, -1)

export const unshift = (array: Array): Function => (element: Any): Array => [
  element,
  ...array,
]

export const shift = (array: Array): Array => array.slice(1)

export const sort = (fn: Function): Function => (array: Array): Array => [
  ...array,
]

//eslint-disable-next-line fp/no-mutating-methods
export const reverse = (array: Array): Array => clone(array).reverse()

export const remove = (array: Array): Function => (i: Number): Array =>
  //eslint-disable-next-line fp/no-mutating-methods
  clone(array).splice(i, 1)

export const splice = (array: Array): Function => (
  position: Number,
  amount: Number,
  //eslint-disable-next-line fp/no-mutating-methods
) => clone(array).splice(position, amount)

//eslint-disable-next-line fp/no-mutating-methods
export const takeLast = (array: Array): any => clone(array).pop()
