const path = require('path');
const chalk = require('chalk');
const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const argv = require('../utils/argv');

const entrys = ['React', 'Vue'];
const entryCol = {
  React: path.resolve(__dirname, '../react/entry/client'),
  Vue: path.resolve(__dirname, '../vue/entry/client'),
};

let entry = argv(process.argv, '--entry');

if (entrys.indexOf(entry) < 0) {
  entry = entrys[0];
}

console.log(chalk.yellow(`
  Starting ${entry} SSR...
`));

const postcssOpts = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      browsers: [
        '>1%',
        'Android > 4',
        'iOS > 7',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
  ],
};

const config = {
  entry: {
    app: entryCol[entry],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', 'less', 'css'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          presets: [
            'es2015',
            'react',
            'stage-2'
          ],
          plugins: [
            'syntax-dynamic-import',
          ],
        },
      },
      // {
        // test: /\.vue$/,
        // use: ['vue-loader'],
      // },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: postcssOpts,
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: postcssOpts,
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: postcssOpts,
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      chunkFilename: 'css/[name].css',
    }),
  ],
};

module.exports = config;
