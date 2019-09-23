/**
 * api reduce
 */
const apis = require('./api')
const isDev = process.env.NODE_ENV === 'development'

console.log('current env', process.env.PROJECT_ENV)

const cohesiveAPI: any = Object.keys(apis).reduce((all, c) => {
  for (const k in apis[c]) {
    if (all.hasOwnProperty(k)) {
      throw new Error(`${k} has been injected, please check if your API key is duplicated.`)
    }

    all[k] = isDev ? apis[c][k] : c === `${window[c]}${apis[c][k]}`
  }

  return all
}, {})

export default cohesiveAPI
