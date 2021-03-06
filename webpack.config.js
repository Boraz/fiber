var path = require('path');  //check we have this module
var webpack = require('webpack');  //check we have this module

module.exports = {  //export so you can use this elswhere
  devtool: 'eval',
  entry: {
    app : [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './lib/index.js'],  //app module
  },
  output: {
    path: path.join(__dirname, './public/js/'),  //output path
    filename: `app.js`,
    publicPath: '/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()  // Hot module replacement plugin
  ],
  node: { 
    fs: "empty"  // fileSystem module set to empty
  },
  resolve: { 
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')  // join path to react to the alias
    },
    extensions: ['', '.js']  // javascript
  },
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')  // path for loaders if things go bad
  },
  module: {    
    loaders: [
    {
      test: /\.js$/,  // test js thing
      loaders: ['react-hot', 'babel'],  // use babel & react-hot to load js files
      exclude: /node_modules/,  // don't load node_modules
      include: [path.join(__dirname,'./lib')]  // include this dir
    },
    {
      test: /\.xml$/,  // test xml thing
      loader: "raw"  // use raw loader
    },
    {
      test: /\.json$/,  // test JSON thing
      loaders: ['json-loader']  // use json loader
    },
    {
      test: /\.css?$/,  // check css file
      loaders: ['style', 'raw'],  // use raw loader
      include: __dirname  // include default directory
    }]
  }
};