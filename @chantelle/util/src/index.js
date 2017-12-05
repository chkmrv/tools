// @flow
import debugFactoryWithName from '@nod/debug-with-package-name'

export const createNumberSequence = (length: number): Array<*> => [
  ...Array(length).keys(),
]

export const random = (max: number = 9999, min: number = 1): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const valueOrDefaultValue = (value: any, defaultValue: any) =>
  typeof value !== 'undefined' ? value : defaultValue

// eslint-disable-next-line fp/no-nil, better/explicit-return
export const thrower = (error: Error) => {
  throw error // eslint-disable-line fp/no-throw
}

export const pipe = (functions: Array<Function>) => (arg: any) =>
  functions.reduce(
    (value: any, func: Function): any =>
      valueOrDefaultValue(func(value), value),
    arg,
  )

export const compareIntegers = (a: number, b: number): number =>
  a > b ? -1 : b > a ? 1 : 0

export const objectMap = (objectToIterate: Object, func: Function): Object =>
  Object.entries(objectToIterate).reduce(
    (accumulator, [key, value]) => ({
      ...accumulator,
      ...{
        [key]: func(value, key),
      },
    }),
    objectToIterate,
  )

export const objectWithBooleansFromStrings = (
  objectToIterate: Object,
): Object =>
  objectMap(
    objectToIterate,
    pipe([
      value => (value === 'true' ? true : undefined), // eslint-disable-line fp/no-nil
      value => (value === 'false' ? false : undefined), // eslint-disable-line fp/no-nil
    ]),
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
  module && module.parent ? module.parent : null // eslint-disable-line fp/no-nil

export const debugFactory = (additionalPrefix: ?string = ' %O'): Function =>
  debugFactoryWithName(getParentModule())

export const debug = (variable: ?any, description: ?string = ' %O'): any =>
  pipe([variable => debugFactory()(description, variable)])(variable)

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
