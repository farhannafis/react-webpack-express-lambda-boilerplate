const {
  DefinePlugin,
  HotModuleReplacementPlugin,
  ProvidePlugin,
} = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

require("dotenv").config({ path: "./.env.local.example" });

module.exports = {
  entry: ["regenerator-runtime/runtime.js", "./src/app/index.js"],
  target: "web",
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      /* A webpack plugin that allows you to import React without having to import it in every file. */
      React: "react",
    }),
    /* Making the environment variables available to the client. */
    new DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: { presets: ["@babel/preset-react", "@babel/preset-env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        use: ["file-loader", "url-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "local_build"),
    publicPath: "/",
    filename: "static/bundle.js",
  },
};
