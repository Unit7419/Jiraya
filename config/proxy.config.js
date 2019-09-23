/**
 * 项目api跨域代理
 */
const chalk = require('chalk')
const apiConfig = require('../src/app/config/api.config')
const APISMap = require('../src/app/apis/api')
const argv = process.argv[process.argv.length - 1]
const env = Object.keys(apiConfig).find(k => k === argv)

console.log('[当前环境]:', chalk.green(env))

module.exports = Object.keys(APISMap).reduce((proxyTable, proxyDomain) => {
  const domainApiMap = APISMap[proxyDomain]

  proxyTable.push([
    Object.keys(domainApiMap).reduce((apis, apiKey) => [...apis, domainApiMap[apiKey]], []),
    {
      target: env ? apiConfig[env][proxyDomain] : 'http://mock.xxx.com',
      changeOrigin: true,
    },
  ])

  return proxyTable
}, [])
