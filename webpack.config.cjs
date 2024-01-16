const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/i,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.module\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/Modals/',
            },
          },
        ],
      },
      {
        test: /\.(pdf|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'assets/Modals/',
            },
          },
        ],
      },
      {
   
         
              test: /\.scss$/,
              use: [
                  "style-loader", // 3. Inject styles into DOM
                  "css-loader", // 2. Turns css into commonjs
                  "sass-loader", // 1. Turns sass into css
              ],
          },
          { // here doing the swiper loader and declaring no sideEffects
            test: /swiper\.esm\.js/,
            sideEffects: false
          }
     
      
    ],
  },
  devServer: {
    static: 'public',
    open: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    watchFiles: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.html', 'dist/**/*.html'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
};
