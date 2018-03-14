var path = require("path");

module.exports = {
  entry: {
   index: "./src/index.js",
   xss: "./src/xss.js" 
  },
  
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 9000,
    compress: true,
    open: true
  },

  mode: "development",

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['babel-preset-env'],
          }
        }
      },
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ]
      }
    ]
  }
};