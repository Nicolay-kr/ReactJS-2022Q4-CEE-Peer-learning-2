const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context:path.join(__dirname,'src'),
  entry: './index.tsx',
  devtool: 'inline-source-map',
  output:{
    path: path.join(__dirname,'/dist'),
    filename: 'index_bundle.js',
  },
  module:{
    rules:[
      {
        test: /\.js$|jsx|.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ],
  
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [new HtmlWebpackPlugin({
    template:'./index.html'
  })],
}