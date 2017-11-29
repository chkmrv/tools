export const jestCssTransform = () => ({
  process() {
    return 'module.exports = {};'
  },
  getCacheKey() {
    // The output is always the same.
    return 'cssTransform'
  },
})

export default jestCssTransform
