/* eslint-disable */
const interfaces = require('os').networkInterfaces()
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpackConfig = require('./webpack.base')

const getIPAdress = () => {
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

module.exports = merge(webpackConfig, {
    plugins: [
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You application is running here: http://${getIPAdress()}:8866`]
            }
        })
    ],
    devServer: {
        contentBase: "../dist/",
        historyApiFallback: true,
        hot: true,
        port: 8866,
        host: getIPAdress(),
        overlay: false,
        quiet: true,
        disableHostCheck: true,
        open: true
    }
})