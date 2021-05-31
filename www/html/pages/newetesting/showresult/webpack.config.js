const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
 plugins: [new MiniCssExtractPlugin()],
 mode: 'none',
 entry: './src/index.js',
 output: {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist'),
 },
 devServer: {
  contentBase: path.join(__dirname, ''),
  hot: true,
 },
 module: {
  rules: [
   {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
   },
  ],
 },
 optimization: {
  minimize: true,
  minimizer: [new TerserPlugin()],
  splitChunks: {
   cacheGroups: {
    vendor: {
     test: /[\\/]node_modules[\\/]/,
     name: 'vendors',
     chunks: 'all',
    },
   },
  },
 },
}
