const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      core: path.resolve(__dirname, 'src/core'),
      infra: path.resolve(__dirname, 'src/infra'),
      scenes: path.resolve(__dirname, 'src/scenes'),
      ui: path.resolve(__dirname, 'src/ui'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "GameHub",
      template: "src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/assets", to: "assets", noErrorOnMissing: true }],
    }),
  ],
};
