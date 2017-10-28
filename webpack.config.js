var webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['./src/js/dependencies.js']
  },

  output: {
    filename: './dist/js/[name].js'
  }
}