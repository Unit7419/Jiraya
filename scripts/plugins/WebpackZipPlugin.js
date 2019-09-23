const exec = require('child_process').exec
const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const zip = require('gulp-zip')
const chalk = require('chalk')
const loading = require('loading-cli')({
  text: 'Webpack zip plugin running... ',
  frames: ['🕐 ', '🕑 ', '🕒 ', '🕓 ', '🕔 ', '🕕 ', '🕖 ', '🕗 ', '🕘 ', '🕙 ', '🕚 '],
})

const settings = {
  zipOutputDir: '',
  zipName: '',
  root: '',
}
const log = (str, color = 'green') => console.log(chalk[color](str))
const HtmlWebpackPlugin = 'HtmlWebpackPlugin'

module.exports = class WebpackZipPlugin {
  constructor(options) {
    loading.start()

    this.options = {
      ...settings,
      ...options,
    }

    this.validate()
  }

  validate() {
    const {zipOutputDir, zipName, root} = this.options

    if (![zipOutputDir, zipName, root].every(Boolean)) {
      log(
        'Webpack Zip Error: \n \n The arguments `zipOutputDir`, `zipName` and `root` were must be required. \n',
        'red',
      )

      process.exit(0)
    }
  }

  handleZip() {
    const {zipOutputDir, zipName, root} = this.options
    const zipOutputDirFullPath = path.resolve(zipOutputDir)
    const zipDir = zipName.replace('_', '-').replace('.zip', '')
    const zipDirFullPath = `${zipOutputDirFullPath}/${zipDir}`

    // const zipShell = `cd ${zipDirFullPath} && zip -r ${zipName} *`
    // const mvShell = `cd ${zipDirFullPath} && mv -fi ${zipName} ../${zipName}`

    log(`\n ${new Date()}`, 'blue')
    log(`\n     The zip package had be put here ${zipDirFullPath} \n`, 'cyan')

    fs.copyFile(
      `${path.join(path.resolve(root), 'public')}/favicon.ico`,
      `${zipDirFullPath}/favicon.ico`,
      err => {
        if (err) log(`Favicon.icon file copy error. ${err}`, 'red')

        gulp
          .src(`${zipDirFullPath}/**/*.*`)
          .pipe(zip(zipName))
          .pipe(gulp.dest(zipOutputDirFullPath))
      },
    )

    // this.spreadStdoutAndStdErr(exec(zipShell, this.pipe))
    // this.spreadStdoutAndStdErr(exec(mvShell, this.pipe))

    loading.stop()
  }

  pipe(error) {
    if (error) {
      throw error
    }
  }

  spreadStdoutAndStdErr(stream) {
    stream.stdout.pipe(process.stdout)
    stream.stderr.pipe(process.stdout)
  }

  apply(compiler) {
    // DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
    /**
     * @see https://webpack.docschina.org/api/compiler
     */
    // compiler.plugin('done', () => this.handleZip())
    compiler.hooks.done.tap(HtmlWebpackPlugin, () => this.handleZip())
  }
}
