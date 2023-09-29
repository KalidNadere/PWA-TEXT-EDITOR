const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HtmlWebpackPlugin to generate HTML files
      new HtmlWebpackPlugin({
        template: '/src/index.html',
        filename: 'index.html',
        chunks: ['main'], // specified entry point
      }),

      // WebpackPwaManifest to generate manifest.json file
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E', // Short name for home screen
        description: 'A Progressive Web Text Editor',
        background_color: '#ffffff', // Background color for splash screen
        theme_color: '#000000', // Theme color for the PWA
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to app icon
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'), // Output directory for icons
          },
        ],
      }),

      // Add InjectManifest to integrate your service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Path to service worker script
        swDest: 'sw.js', // Output file for service worker
      })
    ],

    module: {
      // CSS loaders
      rules: [
        {
          test: /\.CSS$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          // Using babel-loader in order to use ES6
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
