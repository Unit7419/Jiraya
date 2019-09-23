const matchFileReg = /\.\/[^\/]+\/([^\/]+)\/index\.tsx/

export default require
  .context('./', true, /.index\.tsx$/)
  .keys()
  .filter(path => matchFileReg.test(path))
  .map(path => ({
    path: `/${matchFileReg.exec(path)[1]}`,
    component: require(`@app/modules${path.slice(1)}`).default,
  }))
