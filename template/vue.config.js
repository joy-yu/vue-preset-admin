const proxyTable = require('./config/proxy.config');
const isProduction = process.env.NODE_ENV === 'production';
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: '/admin',
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    proxy: proxyTable
  },
  configureWebpack: webpackCfg => {
    if (isProduction) {
      webpackCfg.plugins.push(
        new CompressionPlugin({
          test: /\.(js|html|css)$/,
          threshold: 20480
        })
      );
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/variables.scss";`
      }
    }
  }
};
