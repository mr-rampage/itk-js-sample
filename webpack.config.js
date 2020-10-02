const path = require('path')

const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

const entry = path.join(__dirname, 'src', 'main.js')
const outputPath = path.join(__dirname, './public')

module.exports = {
  node: {
    fs: 'empty'
  },
  entry,
  output: {
    path: outputPath,
    filename: 'webpack.js'
  },
  module: {
    rules: [
      {test: entry, loader: 'expose-loader', options: { exposes: [ 'index']}},
      {test: /\.js$/, loader: 'babel-loader'}
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'node_modules', 'itk', 'WebWorkers'),
          to: path.join(__dirname, 'public', 'itk', 'WebWorkers')
        },
        {
          from: path.join(__dirname, 'node_modules', 'itk', 'ImageIOs'),
          to: path.join(__dirname, 'public', 'itk', 'ImageIOs')
        },
        {
          from: path.join(__dirname, 'node_modules', 'itk', 'MeshIOs'),
          to: path.join(__dirname, 'public', 'itk', 'MeshIOs')
        }
      ]
    })
  ],
  performance: {
    maxAssetSize: 10000000
  }
}