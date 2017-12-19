import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import webpack from 'webpack'
import path from 'path'

const paths = {}
paths.dist = path.resolve(__dirname, 'dist')
paths.src = path.resolve(__dirname, 'src')
paths.components = path.resolve(paths.src, 'components')
paths.services = path.resolve(paths.src, 'services')

export default {
  entry: './src/index.js',

  output: {
    path: paths.dist,
    filename: '[name].[chunkhash].js'
  },

  module: {
    rules: [
      {test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader'},

      // .scss will be injected into index.html as a `<style>` tag
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {plugins: () => [require('autoprefixer')]}
          },
          'sass-loader'
        ]
      },

      // .css files will be injected into index.html as a `<style>` tag
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    alias: {
      src: paths.src,
      components: paths.components,
      services: paths.services
    },

    extensions: ['.js', '.jsx', '.json']
  },

  plugins: [
    new CleanWebpackPlugin([paths.dist]),
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({context = ''}) => context.includes('node_modules')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })
  ],

  devtool: 'cheap-eval-source-map',

  devServer: {
    contentBase: paths.dist,
    compress: true,
    port: 9000,
    historyApiFallback: true
  }
}
