const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pageConfig = require('../src/page.config.js');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: {},
  // 配置出口
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'static/scripts/[name].[hash:7].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.scss', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.scss$/,
      loader: 'sass-resources-loader',
      options: {
        resources: [
          './src/style/common/mixins.scss',
          './src/style/common/var.scss',
          './src/style/common/reset.scss'
        ]
      }
    },
    {
      test: /\.(js)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [path.join(__dirname, './src')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
      // html中的img标签
    {
      test: /\.html$/,
      loader: 'html-withimg-loader',
      include: [path.join(__dirname, '../src')],
      options: {
        limit: 10000,
        name: 'static/images/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [path.join(__dirname, '../src')]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'static/images/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'static/media/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'static/fonts/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.css$/,
      use: [
        process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
      ]
    },
    {
      test: /\.s[ac]ss$/,
      use: [
        process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      APP_ENV: 'local'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ProgressBarPlugin()
  ]
}
if (pageConfig && Array.isArray(pageConfig)) {
  pageConfig.map(page => {
    webpackConfig.entry[page.name] = `./src/pages/${page.jsEntry}`;
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      filename: path.join(__dirname, `../dist/${page.name}.html`),
      template: path.join(__dirname, `../src/pages/${page.html}`),
      inject: true,
      chunks: [page.name],
      inlineSource: '.(js|css)$',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }))
  })
}

module.exports = webpackConfig
