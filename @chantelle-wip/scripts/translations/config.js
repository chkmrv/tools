import fs from 'fs'
import dotenv from 'dotenv'

const path = '@chantelle/config/env.json'
dotenv.load()

export const Config = (() => {
  const getConfig = () => {
    const config = JSON.parse(fs.readFileSync(path, 'utf8'))
    const env = process.env
    for (const k in env) {
      if (env.hasOwnProperty(k)) {
        config[k] = env[k]
      }
    }
    return config
  }
  return {
    getConfig,
  }
})()

export default Config
