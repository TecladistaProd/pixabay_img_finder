const path = require('path')
const HWP = require('html-webpack-plugin')
const ETWP = require('extract-text-webpack-plugin')
const CWP = require('clean-webpack-plugin')
const fs = require('fs')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'src/js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|sass)$/i,
        use:  ETWP.extract({
          fallback: 'style-loader/url',
          use: [
            {loader: 'css-loader', options: { minimize: true }}, 'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|jpge|gif|svg|bmp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'src/media/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [ 
    new CWP(['build'],{
      root: path.join(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    new ETWP({filename: 'src/css/[name].css'}),
    new HWP({
      template: './public/index.html',
      script: 'window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {}'
    })
  ],
}
