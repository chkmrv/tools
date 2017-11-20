import { resolve, endsWith, substr, join } from 'path'
import { realpathSync } from 'fs'
import url from 'url'

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
export const appDirectory = realpathSync(process.cwd())

export const resolveApp = relativePath =>
  resolve(appDirectory, relativePath)

const envPublicUrl = process.env.PUBLIC_URL

export const ensureSlash = (path, needsSlash) => {
  const hasSlash = endsWith('/')
  if (hasSlash && !needsSlash) {
    return substr(path, path.length - 1)
  } else if (!hasSlash && needsSlash) {
    return `${ path }/`
  } else {
    return path
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
export const getServedPath = appPackageJson => {
  const publicUrl = getPublicUrl(appPackageJson)
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/')
  return ensureSlash(servedUrl, true)
}

const themesBare = './'
const themesLingerieBare = join(themesBare, 'lingerie/js/react')
const themesLiveraBare = join(themesBare, 'livera/js/react')

// config after eject: we're in ./config/
export const vendor = resolveApp('../../../js')
export const util = resolveApp('util')
export const config = resolveApp('config')
export const dotenv = resolveApp('.env')
export const appBuild = resolveApp(join('build'))
export const appPublic = resolveApp(join('public'))
export const appHtml = resolveApp(join('public', 'index.html'))
export const appIndexJs = resolveApp(join(themesBare, 'index.js'))
export const appPackageJson = resolveApp('package.json')
export const appSrc = resolveApp(themesBare)
export const yarnLockFile = resolveApp('yarn.lock')
export const appNodeModules = resolveApp('node_modules')
export const servedPath = getServedPath(resolveApp('package.json'))
