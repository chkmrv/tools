import path from 'path'

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/tutorial-webpack.html

export const jestFileTransform = () => ({
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`
  },
})

export default jestFileTransform
