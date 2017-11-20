import cfg from './config/config'
const config = cfg.getConfig()

const Themes = (() => {
  const dependencies = config.dependencies
  const getThemes = name => {
    const themes = []
    if (!name) {
      return themes
    }
    while (dependencies[name] && name != dependencies[name]) {
      themes.push(name)
      name = dependencies[name]
    }
    themes.push(name)
    return themes
  }

  return {
    getThemes,
  }
})()

export default Themes
