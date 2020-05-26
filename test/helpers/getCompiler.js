import webpack from 'webpack';
import path from "path";
const VueLoaderPlugin = require('vue-loader/lib/plugin');

export default (fixture, loaderOptions= {}, config = {}) => {
  const fullConfig = {
    mode: 'development',
    devtool: config.devtool || false,
    context: path.resolve(__dirname, '../fixtures'),
    entry: path.resolve(__dirname, '../fixtures', fixture),
    output: {
      path: path.resolve(__dirname, '../outputs'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.(html)$/i,
          use: [
            {
              loader: "html-loader",
            },
            {
              loader: path.resolve(__dirname, '../../src'),
              options: loaderOptions || {},
            },
          ],
        },
        {
          test: /\.(vue)$/i,
          use: [
            {
              loader: 'vue-loader'
            },
            {
              loader: path.resolve(__dirname, '../../src'),
              options: loaderOptions || {},
            },
          ],
        }
      ],
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    ...config
  }
  return webpack(fullConfig);
}
