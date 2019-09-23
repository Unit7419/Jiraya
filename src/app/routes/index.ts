import pages from '../modules'

export default pages.map(({component, path}) => ({
  path,
  exact: false,
  component,
}))
