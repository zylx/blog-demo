const {
  resolve
} = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConf = require('./webpack.base.conf.js');

module.exports = merge(webpackBaseConf, {
  // 开发模式，webpack会根据该模式使用相应的编译配置
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // 显示被替换模块的名称
  ],
  devServer: {
    port: 8080,
    contentBase: resolve(__dirname, '../server/public/dist'),
    overlay: {
      errors: true
    },
    // historyApiFallback: true,
    historyApiFallback: {
      index: resolve(__dirname, '/index.html')
    },
    hot: true, // 开启热点
    open: false, // 自动打开浏览器
    progress: true, // 显示打包的进度
    quiet: false, // 控制台中不输出打包的信息
    noInfo: false,
    inline: true, // 开启页面自动刷新
    lazy: false, // 不启动懒加载
    watchOptions: {
      // 不监听的文件或文件夹，支持正则匹配
      ignored: /node_modules/,
      // 监听到变化后等300ms再去执行动作
      aggregateTimeout: 300,
      // 默认每秒询问1000次
      poll: 1000
    },
    // 配置解决跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        pathRewrite: {
          '^/api': '' // 路径重写
        },
        changeOrigin: true, // 设置为true，那么本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了，当然这只适用于开发环境
        secure: false, // 不检查安全问题
      }
    }
  },
  devtool: 'cheap-module-eval-source-map'
});
