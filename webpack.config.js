var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true
  },
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve:{
    root:__dirname,
    alias:{
      home:'src/components/home/home',
      Login:'src/components/login/login',
      SignUp:'src/components/sinup/SignUp',
      constants:"src/constants",
      selectors:'src/selectors'
    }
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: __dirname
      }
    ]
  }
}
