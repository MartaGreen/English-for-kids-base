const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    cardsInfo: "./src/scripts/cardsInfo.js",
    cardsImages: "./src/scripts/cardsImagesImport.js",
    pageRender: "./src/scripts/pageRender.js",
    stylesImport: "./src/scripts/stylesImport.js",
    soundsImport: "./src/scripts/soundsImport.js",
  },
  devtool: "eval-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["carsInfo", "cardsImages", "pageRender", "stylesImport", "soundsImport"],
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
        options: {
          outputPath: "sounds",
          name: '[name].[ext]',
        },
      },
    ],
  },
  stats: {
    children: true,
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
    extensions: [".js", ".jsx", ".css"],
  },
};
