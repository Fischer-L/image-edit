const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pageConfig = require("./config/githubPage");

const ROOT_DIR = path.resolve(__dirname, process.env.GITHUB_PAGE ? "docs" : "dist")

module.exports = {
  entry: {
   index: "./src/index.js",
   "convolutionWorker": "./src/convolutionWorker.js"
  },
  
  output: {
    path: ROOT_DIR,
    filename: "[name].bundle.js",// "[name].[contenthash].js",
    publicPath: "./"
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
    },
  },

  devServer: {
    port: 3000,
    compress: true,
    open: true,
    hot: true,
    contentBase: ROOT_DIR,
  },
  
  devtool: 'source-map',

  mode: "development",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['babel-preset-env'],
            "plugins": [
              "transform-runtime"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader" ]
      },
      {
        test: /\.(png|jpg|gif|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: './',
            }  
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      ...require(process.env.GITHUB_PAGE ? "./config/githubPage.js" : "./config/index.js"),
    }),
    
    new MiniCssExtractPlugin({
      filename: "[name].css", //"[name].[contenthash].css",
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
  ],
};