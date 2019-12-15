import path from 'path';
import webpack from 'webpack';
import DotenvWebpack from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';


export default {
    devtool: 'eval-source-map',
    mode: 'production',
    entry: [
        path.join(process.cwd(), 'src/index'),
    ],
    output: {
        filename: 'bundle.js',
        path: path.join(process.cwd(), 'dist'),
        publicPath: '/',
    },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
    plugins: [
      new DotenvWebpack(),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new HtmlWebpackPlugin({
          template: './public/index.html',
        }),
    ],
    module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.js$/,
            use: 'eslint-loader',
          },
            {
              test: /\.svg$/,
              use: 'svg-inline-loader',
            },
            {
              test: /\.(jpe?g|png|gif|ico)$/i,
              use: 'file-loader',
            },
            {
              test: /\.js?$/,
              use: 'babel-loader',
              exclude: /node_modules/,
            },
            {
              test: /\.json$/,
              use: 'json-loader',
            },
            {
              test: /\.(s)?css$/,
              use: ['style-loader', 'css-loader'],
            },
        ],
    },
    target: 'web',
};
