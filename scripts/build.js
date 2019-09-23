'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
require('../config/env')

const chalk = require('react-dev-utils/chalk')
const fs = require('fs-extra')
const webpack = require('webpack')
const configFactoryList = require('../config/webpack.config')
const paths = require('../config/paths')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const FileSizeReporter = require('react-dev-utils/FileSizeReporter')
const printBuildError = require('react-dev-utils/printBuildError')

const appPackageJson = require(paths.appPackageJson)

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

const isInteractive = process.stdout.isTTY

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

// Generate configuration list
const configList = configFactoryList.map(({configFactory, env}) => ({
  config: configFactory('production'),
  env,
}))

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const {checkBrowsers} = require('react-dev-utils/browsersHelper')

// {
//   `h5-banker-${env}/static/css/2.css`: 5035,
//   `h5-banker-${env}/static/js/2.js`: 184821,
//   `h5-banker-${env}/static/js/main.js`: 185786,
//   `h5-banker-${env}/static/js/runtime~main.js`: 775
// }
checkBrowsers(paths.appPath, isInteractive)
  .then(async () => await measureFileSizesBeforeBuild(paths.appBuild))
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild)
    // Merge with the public folder
    copyPublicFolder()
    // Start the webpack build
    return build(previousFileSizes)
  })
  .then(promises => Promise.all(promises))
  .then(
    res => {
      res.forEach(({stats, previousFileSizes, warnings, env}) => {
        if (warnings.length) {
          console.log(chalk.yellow('Compiled with warnings.\n'))
          console.log(warnings.join('\n\n'))
          console.log(
            '\nSearch for the ' +
              chalk.underline(chalk.yellow('keywords')) +
              ' to learn more about each warning.',
          )
          console.log(
            'To ignore, add ' +
              chalk.cyan('// eslint-disable-next-line') +
              ' to the line before.\n',
          )
        } else {
          console.log(chalk.green('Compiled successfully.\n'))
        }

        console.log('File sizes after gzip:\n')

        const zipPackageName = `h5-${appPackageJson.name}-${env}`
        const zipDir = `/${zipPackageName}`
        const sizeOptions = previousFileSizes.sizes

        // Fix multi package file size output
        printFileSizesAfterBuild(
          stats,
          {
            sizes: Object.keys(sizeOptions).reduce(
              (sizeOption, path) => ({
                ...sizeOption,
                [path.replace(`${zipPackageName}/`, '')]: sizeOptions[path],
              }),
              {},
            ),
            root: `${previousFileSizes.root}${zipDir}`,
          },
          `${paths.appBuild}${zipDir}`,
          WARN_AFTER_BUNDLE_GZIP_SIZE,
          WARN_AFTER_CHUNK_GZIP_SIZE,
        )
      })
    },
    err => {
      console.log(chalk.red('Failed to compile.\n'))
      printBuildError(err)
      process.exit(1)
    },
  )
  .catch(err => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  // We used to support resolving modules according to `NODE_PATH`.
  // This now has been deprecated in favor of jsconfig/tsconfig.json
  // This lets you use absolute paths in imports inside large monorepos:
  if (process.env.NODE_PATH) {
    console.log(
      chalk.yellow(
        'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.',
      ),
    )
    console.log()
  }

  console.log('Creating an optimized production build...')

  const compilers = configList.map(({config, env}) => ({
    compiler: webpack(config),
    env,
  }))

  return compilers.map(
    ({compiler, env}) =>
      new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
          let messages
          if (err) {
            if (!err.message) {
              return reject(err)
            }
            messages = formatWebpackMessages({
              errors: [err.message],
              warnings: [],
            })
          } else {
            messages = formatWebpackMessages(
              stats.toJson({all: false, warnings: true, errors: true}),
            )
          }
          if (messages.errors.length) {
            // Only keep the first error. Others are often indicative
            // of the same problem, but confuse the reader with noise.
            if (messages.errors.length > 1) {
              messages.errors.length = 1
            }
            return reject(new Error(messages.errors.join('\n\n')))
          }
          if (
            process.env.CI &&
            (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
            messages.warnings.length
          ) {
            console.log(
              chalk.yellow(
                '\nTreating warnings as errors because process.env.CI = true.\n' +
                  'Most CI servers set it automatically.\n',
              ),
            )
            return reject(new Error(messages.warnings.join('\n\n')))
          }

          return resolve({
            env,
            stats,
            previousFileSizes,
            warnings: messages.warnings,
          })
        })
      }),
  )
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  })
}
