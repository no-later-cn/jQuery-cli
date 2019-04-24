/* eslint-disable */
const webpack = require('webpack');
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackConfig = require('./webpack.base')

class ChunksFromEntryPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('ChunksFromEntryPlugin', compilation => {
            compilation.hooks.htmlWebpackPluginAlterChunks.tap(
                'ChunksFromEntryPlugin',
                (_, {
                    plugin
                }) => {
                    const entry = plugin.options.entry;
                    const entrypoint = compilation.entrypoints.get(entry);

                    return entrypoint.chunks.map(chunk =>
                        ({
                            names: chunk.name ? [chunk.name] : [],
                            files: chunk.files.slice(),
                            size: chunk.modulesSize(),
                            hash: chunk.hash
                        })
                    );
                }
            );
        });
    }
}

module.exports = merge(webpackConfig, {
    devtool: false,
    plugins: [
        new UglifyJsPlugin({
            sourceMap: false,
            parallel: true
        }),
        new MiniCssExtractPlugin({
            filename: 'static/styles/[name].[hash:7].css'
        }),
        new ChunksFromEntryPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
})