var webpack = require('webpack')
var pkg = require('./package.json')
var argv = require('yargs').argv
var deps = Object.keys(pkg.dependencies)
var isProduction = !! argv.p
var host = argv.host || '127.0.0.1'
var port = argv.port || 8080
var DEV_SERVER_HOST = `http://${host}:${port}`



var BUILD_DIR = 'dist'
var PLUGINS = isProduction ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
] : [
    new webpack.HotModuleReplacementPlugin()
]
var DEPS = isProduction ? _.pull(deps.concat(), 'superagent-mocker') : deps.concat([
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080'
])
var NODE_ENV = isProduction ? 'production' : 'development'
module.exports = function () {
    process.env.NODE_ENV = NODE_ENV
    var JS_DIR = `${BUILD_DIR}/js`
    var STYLE_BUNDLE_PATH = isProduction ?
        `${BUILD_DIR}/css/app.[chunkHash].css` : `${BUILD_DIR}/css/app.css`
    return {
        IS_PRODUCTION: isProduction,
        NODE_ENV,
        BUILD_DIR,
        PLUGINS,
        DEV_SERVER_HOST,
        DEPS,
        STYLE_BUNDLE_PATH,
        ENTRY_PATH : `./app/index.js`,
        APP_BUNDLE_PATH : isProduction ? `${JS_DIR}/app.[chunkHash].js` : `${JS_DIR}/app.js`,
        VENDOR_BUNDLE_PATH : isProduction ? `${JS_DIR}/common.[chunkHash].js` : `${JS_DIR}/common.js`
    }
}