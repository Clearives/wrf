var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var config = require('./config')()
var PUBLIC_PATH = config.DEV_SERVER_HOST + '/'
var extracter = new ExtractTextPlugin(config.STYLE_BUNDLE_PATH, {allChunks: true})
module.exports = {
    entry: {
        vendor: config.DEPS,
        app: config.ENTRY_PATH,
    },
    output: {
        filename: config.APP_BUNDLE_PATH,
        publicPath: PUBLIC_PATH
    },
    devtool: "source-map", // or "inline-source-map"
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            //{
            //    test: /\.css$/,
            //    loader: ExtractTextPlugin.extract('style-loader', 'css-loader', {
            //        publicPath: config.PUBLIC_PATH
            //    })
            //},
            {
                test: /\.scss$/,
                //loader: 'style!css!sass'
                loader: extracter.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap&outputStyle=expanded', {
                    publicPath: config.PUBLIC_PATH
                })
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": `"${config.NODE_ENV}"`
            }
        }),
        extracter,
        new webpack.optimize.CommonsChunkPlugin('vendor', config.VENDOR_BUNDLE_PATH)
    ].concat(config.PLUGINS)
};