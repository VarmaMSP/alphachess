const path = require('path');

const projectPath = __dirname;

module.exports = {
  entry: [
    path.join(projectPath, 'app', 'index.jsx')
  ],
  output: {
    path: path.join(projectPath, 'static', 'js'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.join(projectPath, 'node_modules'),
      path.join(projectPath, 'app')
    ],
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'es2017', 'stage-0']
        },
        exclude: /(node_modules)/
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
