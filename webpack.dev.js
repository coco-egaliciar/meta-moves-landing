const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/main.js'
  },
  target: 'web',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    magicHtml: false,
    hot: false,
    server: 'http',
    compress: true,
    port: 9000,
    liveReload: true
  },
  stats: {
    children: true
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.(fbx|glb|gltf)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // https://webpack.js.org/loaders/css-loader/#root
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  'postcss-preset-env',
                  'tailwindcss'
                ]
              ]
            }
          }
        }]
      },
      {
        // https://webpack.js.org/guides/asset-modules/#resource-assets
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        // https://webpack.js.org/loaders/html-loader/#usage
        resourceQuery: /template/,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              // All default supported tags and attributes
              '...',
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src'
              },
              {
                tag: 'img',
                attribute: 'data-srcset',
                type: 'srcset'
              }
            ]
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    })
  ]
}
