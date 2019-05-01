const path = require('path')

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'objectia.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ObjectiaClient'
  }
}
