const path = require('path')
const Dotenv = require('dotenv-webpack')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'production',
  context: path.join(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
  },
  plugins: [
    new Dotenv({
      path: '.env',
    }),
  ],
})
