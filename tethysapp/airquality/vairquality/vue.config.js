const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    outputDir: path.resolve(__dirname, '../public/build'),
    chainWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // If you wish to remove the standard entry point
            config.entryPoints.delete('app')

            // then add your own
            config.entry('airquality')
                .add('./src/airquality.js')
                .end()

            config.module.rule('fonts').use('url-loader')
                .loader('file-loader') // replaces the url-loader
                .tap(options => Object.assign(options, {
                    name: 'static/airquality/fonts/[name].[ext]'
                }))
            config.module.rule('images').use('url-loader')
                .loader('file-loader') // replaces the url-loader
                .tap(options => Object.assign(options, {
                    name: 'static/airquality/images/[name].[ext]'
                }))
            config.module.rule('svg').use('file-loader')
                .tap(options => Object.assign(options, {
                    name: 'static/airquality/images/[name].[ext]'
                }))
        }
    },
    css: {
        extract: {
            filename: 'static/airquality/css/[name].[contenthash].css',
            chunkFilename: 'static/airquality/css/chunkName.[name].[contenthash].css',
        },
    },
    configureWebpack: {
        output: {
            filename: 'static/airquality/js/[name].[hash].js',
            chunkFilename: 'static/airquality/js/[name].[hash].js',
        },
        plugins: [
            new CleanWebpackPlugin(),
        ],

    },
    pages: {
        'apps/airquality': {
            entry: 'src/airquality.js',
            template: 'public/index.html',
            filename: process.env.NODE_ENV === "production" ? '../../templates/airquality/Created_airquality.html' : 'apps/airquality/airquality.html',
            title: 'Air Quality Watch Dashboard',
            chunks: ['chunk-vendors', 'chunk-common', 'apps/airquality']
        },
    }
}



