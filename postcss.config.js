module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        '> 1%',
        'last 2 versions',
        'not ie <= 8'
      ]
    }),
    require('cssnano')()
    // require('postcss-px2rem')({
    //   remUnit: 37.5
    // })
  ]
}
