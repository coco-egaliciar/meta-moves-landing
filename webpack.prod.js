const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WebpackFavicons = require('webpack-favicons')

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const buildPath = path.resolve(__dirname, 'dist')

module.exports = {

  // https://webpack.js.org/configuration/mode/
  mode: 'production',

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    pageOne: './src/pageOne/js/main.js',
    faqs: './src/faqs/js/main.js',
    terms: './src/terms/js/main.js',
    index2: './src/index2/js/main.js'
  },

  // how to write the compiled files to disk
  // https://webpack.js.org/concepts/output/
  output: {
    filename: '[name].[contenthash].js',
    path: buildPath,
    clean: true
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.(fbx|glb|gltf|hdr|exr)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        // https://webpack.js.org/loaders/babel-loader/#root
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // https://webpack.js.org/loaders/css-loader/#root
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 2 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    'tailwindcss',
                    require('autoprefixer'),
                    'cssnano'
                  ]
                ]
              }
            }
          }
        ]
      },
      {
        // https://webpack.js.org/guides/asset-modules/#resource-assets
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name]_[hash][ext][query]'
        }
      },
      {
        // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        // https://webpack.js.org/loaders/html-loader/#usage
        resourceQuery: /template/,
        loader: 'html-loader'
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/terms.html',
      inject: true,
      chunks: ['terms'],
      filename: 'terms.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/faq.html',
      inject: true,
      chunks: ['faqs'],
      filename: 'faq.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['pageOne'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      meta: {
        'og:title': { property: 'og:title', content: 'The MetaMoves NFT project brings avatars to life through movements.' },
        'og:description': { property: 'og:description', content: 'MetaMoves are adaptable to T-pose avatars and are  metaverse friendly.' },
        'og:type': { property: 'og:type', content: 'website' },
        'og:url': { property: 'og:url', content: 'www.meta-moves.com' },
        'og:image': { property: 'og:image', content: 'https://www.meta-moves.com/meta-moves.jpg' },
        'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
        'twitter:title': { name: 'twitter:title', content: 'The MetaMoves NFT project brings avatars to life through movements.' },
        'twitter:description': { name: 'twitter:description', content: 'MetaMoves are adaptable to T-pose avatars and are  metaverse friendly.' },
        'twitter:image': { name: 'twitter:image', content: 'https://www.meta-moves.com/meta-moves.jpg' }
      },
      template: './src/index2.html',
      inject: true,
      chunks: ['index2'],
      filename: 'index2.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),
    new WebpackFavicons({
      appName: 'MetaMoves',
      appShortName: 'MetaMoves',
      appDescription: 'The MetaMoves NFT project brings avatars to life through movements.',
      lang: 'en',
      src: './src/fav.png',
      path: '.',
      background: '#000',
      theme_color: '#000',
      icons: {
        favicons: true,
        android: true,
        appleIcon: true
      }
    })
  ],

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                // That setting might be close to lossless, but it’s not guaranteed
                // https://github.com/GoogleChromeLabs/squoosh/issues/85
                quality: 50
              },
              webp: {
                lossless: 1
              },
              avif: {
                // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
                cqLevel: 0
              }
            }
          }
        }
      }),
      // https://webpack.js.org/plugins/terser-webpack-plugin/
      new TerserPlugin({
        parallel: true
      }),
      // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
      new CssMinimizerPlugin()
    ]
  }
}
