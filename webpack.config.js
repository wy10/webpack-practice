const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RemoveUnusedComponentsPlugin = require("./RemoveUnusedFilesPlugin");

module.exports = {
  mode: "development",
  entry: {
    login0: "./src/page/login/index.js",
    login2: "./src/page/login2/index.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].chunck.[contenthash:4].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // externals: {
  //   vue: "Vue", //从外部加载会迟缓
  // },
  optimization: {
    // 拆分代码
    moduleIds: "deterministic",
    minimizer: [new CssMinimizerPlugin()], //只在production环境下有效
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          minSize: 2000,
          enforce: true,
        },
        utils: {
          name: "utils", // 指定包名，不指定时使用上层key作为包名
          test: /utils/,
          chunks: "all",
          minSize: 10,
          priority: 0,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
        // include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        // include: path.resolve(__dirname, "src"),
      },
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
    new RemoveUnusedComponentsPlugin({
      componentDir: path.resolve(__dirname, "src"), // 指定组件目录
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "登录首页",
      template: "./index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      title: "login0",
      template: "./src/page/login/index.html",
      filename: "login0.html",
      chunks: ["login0"],
    }),
    new HtmlWebpackPlugin({
      title: "login2",
      template: "./src/page/login2/index.html",
      filename: "login2.html",
      chunks: ["login2"],
    }),
  ],
  devServer: {
    client: {
      logging: "none",
      progress: false,
    },
  },
};
