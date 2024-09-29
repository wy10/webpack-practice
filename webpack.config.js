const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
// const ReplaceAttributesPlugin = require("./replaceAttributesPlugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.vue$/,
      //   loader: "vue-loader",
      // },
      {
        test: /\.vue$/,
        use: [
          "vue-loader",
          {
            loader: "./tpl-loader",
            options: {
              log: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new ReplaceAttributesPlugin({
    //   // 在这里定义你想替换的属性
    //   propName: "@gotoPage",
    //   anotherProp: "@login",
    // }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "plugin",
      template: "index.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    client: {
      logging: "none",
      progress: false,
    },
  },
};
