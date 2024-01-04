const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const HTMLTemplate = process.env.NODE_ENV === "production" ? 'public/index_production.html' : 'public/index.html';

module.exports = {
    outputDir: path.resolve(__dirname, '../public/build'),
    chainWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // If you wish to remove the standard entry point
            config.entryPoints.delete('app')

            // then add your own
            config.entry('airqualityRecent')
                .add('./src/airqualityRecent.js')
                .end()
                .entry('airqualityArchive')
                .add('./src/airqualityArchive.js')
                .end()
                .entry('airqualityForecast')
                .add('./src/airqualityForecast.js')
                .end()
                .entry('emission')
                .add('./src/airqualityEmission.js')
                .end()
                .entry('demographic')
                .add('./src/airqualitySocioEconomic.js')
                .end()
                .entry('airqualityRGBProducts')
                .add('./src/airqualityRGBProducts.js')
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
        'apps/airquality/recent': {
            entry: 'src/airqualityRecent.js',
            template: HTMLTemplate,
            filename: process.env.NODE_ENV === "production" ? '../../templates/airquality/Created_airquality_recent.html' : 'apps/airquality/airquality_recent.html',
            title: 'Air Quality Watch - HKH | Recent',
            chunks: ['chunk-vendors', 'chunk-common', 'apps/airquality/recent']
        },
        'apps/airquality/archive': {
            entry: 'src/airqualityArchive.js',
            template: HTMLTemplate,
            filename: process.env.NODE_ENV === "production" ? '../../templates/airquality/Created_airquality_archive.html' : 'apps/airquality/airquality_archive.html',
            title: 'Air Quality Watch - HKH | Archive',
            chunks: ['chunk-vendors', 'chunk-common', 'apps/airquality/archive']
        },
        'apps/airquality/forecast': {
            entry: 'src/airqualityForecast.js',
            template: HTMLTemplate,
            filename: process.env.NODE_ENV === "production" ? '../../templates/airquality/Created_airquality_forecast.html' : 'apps/airquality/airquality_forecast.html',
            title: 'Air Quality Watch - HKH | Forecast',
            chunks: ['chunk-vendors', 'chunk-common', 'apps/airquality/forecast']
        },
        'apps/airquality/emission': {
            entry: 'src/airqualityEmission.js',
            template: HTMLTemplate,
            filename: process.env.NODE_ENV === "production" ? '../../templates/airquality/Created_emission.html' : 'apps/airquality/emission.html',
            title: 'Emission | HKH',
            chunks: ['chunk-vendors', 'chunk-common', 'apps/airquality/emission']
        },
        'apps/airquality/demographic': {
            entry: 'src/airqualitySocioEconomic.js',
            template: HTMLTemplate,
            filename: process.env.NODE_ENV === "production" ? '../../templates/airquality/Created_demographic.html' : 'apps/airquality/demographic.html',
            title: 'Demographic | HKH',
            chunks: ['chunk-vendors', 'chunk-common', 'apps/airquality/demographic']
        },
        'apps/airquality/rgbproducts': {
            entry: 'src/airqualityRGBProducts.js',
            template: HTMLTemplate,
            filename: process.env.NODE_ENV === "production" ? '../../templates/airquality/Created_rgbproducts.html' : 'apps/airquality/rgbproducts.html',
            title: 'RGB Products | HKH',
            chunks: ['chunk-vendors', 'chunk-common', 'apps/airquality/rgbproducts']
        },
    }
}