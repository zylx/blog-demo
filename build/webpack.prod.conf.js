const merge = require('webpack-merge');
// const webpack = require('webpack');
const HardSourcePlugin = require('hard-source-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackBaseConf = require('./webpack.base.conf');

module.exports = merge(webpackBaseConf, {
  mode: 'production',
  module: {
    rules: []
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // initial、async和all
      minSize: 30000, // 形成一个新代码块最小的体积
      maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
      maxInitialRequests: 3, // 最大初始化请求数
      automaticNameDelimiter: '~', // 打包分割符
      name: true,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/, // 打包第三方库
          chunks: 'all',
          priority: 10 // 优先级
        },
        common: { // 打包其余的的公共代码
          minChunks: 2, // 引入两次及以上被打包
          name: 'common', // 分离包的名字
          chunks: 'all',
          priority: 5
        },
      }
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HardSourcePlugin(), // 更好的代替者DLL选择hard-source-webpack-plugin
    new OptimizeCssAssetsPlugin(), // 压缩CSS
    new CompressionWebpackPlugin({ // 开启GZIP压缩
      test: /\.(js|css)$/,
      threshold: 10240 // 这里对大于10k的js和css文件进行压缩
    })
  ],
  devtool: 'cheap-module-source-map'
});
