/* eslint fp/no-mutation:0,import/no-commonjs:0 */

const log = (first, ...bla) => {
  console.info(first, ...bla)
  return first
}

const webpack = config =>
  log(
    {
      ...config,
      cache: false,
    },
    'config'
  )

module.exports = { webpack }
