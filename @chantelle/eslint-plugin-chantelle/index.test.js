import test from 'ava'
import { configs, chantelle, legacy, chantelleCommonJs } from './'

const checkArrayOfObjects = t =>
  arrayOfObjects =>
    arrayOfObjects
      .map(arrayOfObjects =>
          t.is(typeof arrayOfObjects, 'object'))

test('exports objects', t =>
  checkArrayOfObjects(t)([configs, chantelle, legacy, chantelleCommonJs]))

test('exports objects', t => {
  (({chantelle, legacy, chantelleCommonJs}) =>
    checkArrayOfObjects(t)([chantelle, legacy, chantelleCommonJs]))(configs)
})
