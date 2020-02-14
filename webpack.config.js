const path = require('path');

module.exports = {
  entry: {
    'App': './src/App.jsx'
  }, //  entry: './src/main.jsx'
  output: {
    path: path.resolve(__dirname, 'lib/js'),
    filename: '[name].js', // main.js
    publicPath: '/',
  },
  mode: "development", // production || development || none
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use:{
          loader: "babel-loader",
          options:{
            presets: ["@babel/preset-env", '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use:[
          { loader: 'style-loader'},
          { loader: 'css-loader'}
        ],
      }
    ]
  },
  // 為了避免無法bundle的情況,避免某個jsx檔大於250kib
  performance : {
    hints : false
  },
  devServer: {
    historyApiFallback: true
  },
};
