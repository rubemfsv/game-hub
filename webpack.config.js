const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool:
    process.env.NODE_ENV === 'production'
      ? 'source-map'
      : 'eval-cheap-module-source-map',
  devServer: {
    static: './public',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      core: path.resolve(__dirname, 'src/core'),
      infra: path.resolve(__dirname, 'src/infra'),
      scenes: path.resolve(__dirname, 'src/scenes'),
      ui: path.resolve(__dirname, 'src/ui'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    maxAssetSize: 512000, // 500 KiB
    maxEntrypointSize: 512000,
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'PlayCentral',
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/assets', to: 'assets', noErrorOnMissing: true }],
    }),
  ],
};
