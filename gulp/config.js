// ref https://github.com/webpack/docs/wiki/optimization
// ref https://github.com/lpiepiora/bower-webpack-plugin
var webpack = require('webpack')
var path = require('path')

var isDebug = process.env.NODE_ENV !== 'production'
var projectPath = path.resolve(__dirname, '..')
var contentPath = path.resolve(projectPath, 'vue')
var staticPath = path.resolve(projectPath, 'static')
var buildPath = path.resolve(projectPath, 'public')
var publicPath = '/bundle/'
var config = module.exports = {
  contentBase: buildPath,
  projectPath: projectPath,
  webpack: {
    entry: {
      vendor: [path.resolve(contentPath, 'vendor.js')]
    },
    output: {
      path: path.resolve(buildPath, 'bundle'),
      publicPath: publicPath,
      filename: '[name].js',
      chunkFilename: '[id].js'
    },
    resolve: {
      alias: {
        moment: 'moment/min/moment-with-locales.js',
        vue: (isDebug) ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js',
        '~': contentPath,
        '~assets': path.resolve(contentPath, 'assets'),
        '~components': path.resolve(contentPath, 'components'),
        '~middleware': path.resolve(contentPath, 'middleware'),
        '~pages': path.resolve(contentPath, 'pages'),
        '~plugins': path.resolve(contentPath, 'plugins'),
        '~layouts': path.resolve(contentPath, 'layouts'),
        '~static': staticPath
      }
    },
    module: {
      loaders: [{
        test: /\.html$/,
        loader: 'raw-loader!html-minify-loader'
      }, {
        test: /\.css$/,
        use: [{
          loader: "style-loader/useable",
          options: {
            sourceMap: true
          }
        }, {
          loader: "css-loader"
        }],
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'regenerator-loader'
      }, {
        test: /.pug/,
        loader: 'pug-loader'
      }, {
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          name: 'img/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }]
    },
    plugins: [
      new webpack.ProvidePlugin({})
    ],
    devtool: (isDebug) ? 'source-map' : null
  },
  'webpack-dev-server': {
    contentBase: buildPath,
    hot: true,
    inline: true,
    quiet: false,
    noInfo: false,
    publicPath: publicPath,
    stats: {
      colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  static: {
    path: staticPath
  }

}

