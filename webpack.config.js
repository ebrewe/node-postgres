module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: 'public/javascripts',
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test:/\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
