/* eslint fp/no-mutation:0,import/no-commonjs:0 */

const log = (first, ...params) => {
  // eslint-disable-next-line fp/no-unused-expression
  console.info(first, ...params)
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
