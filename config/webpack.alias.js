/**
 * webpack alias config
 */
const path = require('path')
const aliasPathMap = {
  '@root': '',
  '@app': 'app',
  '@lib': 'app/lib',
  '@service': 'app/lib/service/index',
  '@interface': 'app/lib/interfaces',
  '@img': 'app/style/images',
  '@component': 'app/components',
  '@util': 'app/lib/utils/index',
}
const resolveAbsolutePath = (relativePath = '') => path.join(__dirname, `../src/${relativePath}`)

module.exports = Object.keys(aliasPathMap).reduce(
  (map, alias) => ({...map, [alias]: resolveAbsolutePath(aliasPathMap[alias])}),
  {
    'react-native': 'react-native-web',
  },
)
