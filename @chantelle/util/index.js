// @flow

export const tapDebug = (debug: Function) =>
  (variable: any, description?: string = '%O'): any => [
    debug(description, variable),
    variable
  ][1]

// export const createNumberSequence = ( number: number ): Array<*> =>
//     [ ...Array( number ).keys() ]
//
// export const random = ( max: number = 9999, min: number = 1 ): number =>
//     Math.floor( Math.random() * ( max - min + 1 ) ) + min
//
// export const valueOrDefaultValue = ( value: any, defaultValue: any ) =>
//     typeof value !== 'undefined'
//         ? value
//         : defaultValue
//
// export const thrower = ( error: Error ) => { throw error }
//
// export const pipe = ( functions: Array<Function> ) =>
//     arg: any =>
//         functions.reduce( ( value, func: Function ) =>
//             valueOrDefaultValue( func( value ), value ), arg )
//
// export const compareIntegers = ( a: number, b: number ): number =>
//     a > b
//         ? -1
//         : b > a
//             ? 1
//             : 0
//
// export const objectMap = ( objectToIterate: Object, func: Function ): Object =>
//     Object
//         .entries( objectToIterate )
//         .reduce( ( accumulator, [ key, value ] ) =>
//             ({
//                 ...accumulator,
//                 ...{
//                   [ key ]: func(value, key)
//                 },
//             }), objectToIterate)
//
// export const objectWithBooleansFromStrings = ( objectToIterate: Object ): Object =>
//     objectMap(objectToIterate, pipe([
//       value => value === 'true' ? true : undefined,
//       value => value === 'false' ? false : undefined,
//     ]))
//
// export const objectWithoutUndefinedValues = ( objectToIterate: Object ): Object =>
//     Object
//         .entries( objectToIterate )
//         .reduce( ( accumulator, [ key, value ] ) =>
//             value === undefined
//                 ? accumulator
//                 : {
//                     ...accumulator,
//                     ...{ [ key ]: value },
//                 }, {})
//
// export const test = () => console.log('test')