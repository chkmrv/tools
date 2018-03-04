/* eslint fp/no-mutation:0, fp/no-unused-expression:0, better/no-ifs:0, fp/no-nil:0, better/explicit-return:0, import/no-commonjs:0 */

window.jQuery = require('jquery')

if (typeof messaging === 'undefined') {
  window.messaging = {}
}

// if (typeof window.messaging.dispatchOnConnect === 'undefined') {
//   window.messaging.dispatchOnConnect = () => {}
// }

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable()
  window.Promise = require('promise/lib/es6-extensions.js')
}

// fetch() polyfill for making API calls.
require('whatwg-fetch')

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.extend = Object.assign = require('object-assign')
