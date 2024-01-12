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
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/Modals/', // Adjust the path accordingly
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
              limit: 8192, // Convert images smaller than 8kb to base64 strings
              name: '[name].[ext]',
              outputPath: 'assets/Modals/', // Adjust the path accordingly
            },
          },
        ],
      },
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
