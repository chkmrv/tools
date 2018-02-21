import jsonfile from 'jsonfile'
import _ from 'lodash'
import mkdirp from 'mkdirp'
import path from 'path'
import structure from '../../lingerie/translations/structure'
const dist = './lingerie/translations/json/'

createJsonTranlations(structure, dist)
import structureLivera from '../../livera/translations/structure'
const distLivera = './livera/translations/json/'

createJsonTranlations(structureLivera, distLivera)

function createJsonTranlations(structure, dist) {
  _.forEach(structure, (obj, key) => {
    mkdirp(path.resolve(dist), err => {
      if (err) console.error(err)
      const file = path.resolve(`${dist}__translation__${key}.json`)

      console.log('file', file)
      jsonfile.writeFile(file, obj, { spaces: 2 }, err => {
        if (err) console.error(err)
      })
    })
  })
}
