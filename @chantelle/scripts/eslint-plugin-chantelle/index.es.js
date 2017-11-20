import prettier from 'eslint-config-prettier'
import cleanjs from 'eslint-config-cleanjs'
import createConfig from './create-config'
import chantelleRules from './chantelle-rules'
import rules from './rules'
import { debug } from '@chantelle/util'

export default debug({
  configs: {
    legacy: createConfig(prettier),
    chantelle: createConfig(cleanjs),
  },
  rules: {
    ...rules,
    ...chantelleRules,
  },
})
