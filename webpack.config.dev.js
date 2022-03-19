const path = require('path');
const common = require("./webpack.config.common");
const {merge} = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  output: {
    filename: 'dev_main.bundle.js',
    path: path.resolve(__dirname, 'devdev'),
    },
  watch: true, 
  plugins: [new HtmlWebpackPlugin({
         template: "./src/template_index_dev.html",
         filename: "index.html"})
          ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',

      },
    ],
  }

});
