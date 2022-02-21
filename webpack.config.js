const { resolve } = require('path');
const webpack = require('webpack');
const { makeWebpackDevConfig, makeWebpackProdConfig } = require('@bixi-design/builder');
const env = require('./.env');
const proxy = require('./.proxy');

module.exports = () => {
  const mode = process.env.NODE_ENV;
  switch (mode) {
    case 'development':
      return makeWebpackDevConfig(
        {
          context: resolve(__dirname, './'),
          plugins: [new webpack.DefinePlugin(env)],
          devServer: {
            host: '0.0.0.0',
            hot: true,
            port: 4001,
            proxy
          }
        },
        {}
      );
    case 'production':
      return makeWebpackProdConfig(
        {
          context: resolve(__dirname, './'),
          plugins: [new webpack.DefinePlugin(env)]
        },
        {
          analysis: process.env.ANALYSIS === 'true',
          outputPath: resolve(__dirname, './dist')
        }
      );
    default:
      throw new Error(`Not Support: ${mode}`);
  }
};
