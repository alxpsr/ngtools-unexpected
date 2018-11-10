const path = require('path');
const webpack = require('webpack');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
let HtmlWebpackPlugin = require('html-webpack-plugin');
let nodeExternals = require('webpack-node-externals');
let helpers = require('./helpers');

module.exports = function(stat) {
  const isAOT = !(!process.env.AOT);

  let entryPoints = {
    polyfills: './src/polyfills.ts',
    main: './src/main.desktop.ts'
  }

  const htmlPluginOptions = {
    template: './src/index.html',
    chunks: ['main', 'polyfills', 'runtime'],
    chunksSortMode: sortChunk(['runtime', 'polyfills', 'main'])
  }

  const _plugins = [
    new HtmlWebpackPlugin(htmlPluginOptions),
  ]
  
  let tsRules;

  if (isAOT) {
    const aotPluginOptions = {
      entryModule: helpers.root("src/app/app.desktop.module#AppDesktopModule"),
      mainPath: helpers.root('src/main.desktop.ts'),
      tsConfigPath: helpers.root('tsconfig.json')
    };

    _plugins.push(new AngularCompilerPlugin(aotPluginOptions));

    tsRules = {
      test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      loader: '@ngtools/webpack'
    }
  } else {
    tsRules = {
      test: /\.ts?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        }
      },
        'angular2-template-loader',

      ]
    }
  }
  
  return {
    devtool: 'source-map',
    entry: entryPoints,
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        crypto: require.resolve("crypto-browserify"),
      },
      modules: ["node_modules"]
    },
    output: {
      path: path.join(__dirname, 'dist', 'browser'),
      filename: '[name].js',
      chunkFilename: '[id].browser.js',
    },
    module: {
      rules: [
        tsRules,
        { test: /\.html$/, loader: 'html-loader', options: { minimize: true, removeAttributeQuotes: false, caseSensitive: true, customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]], customAttrAssign: [/\)?\]?=/] } },
      ]
    },
    node: {
      crypto: true,
      stream: true,
    },
    optimization: {
      minimize: false,
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "initial",
            minChunks: 2,
            name: "vendor",
            test: /node_modules/,
          },
          common: {
            chunks: "initial",
            minChunks: 2,
            name: "common"
          }
        }
      }
    },
    plugins: _plugins,
  }
}

function sortChunk(packages) {
  return function sort(a, b) {
    if (packages.indexOf(a.names[0]) > packages.indexOf(b.names[0])) return 1;
    if (packages.indexOf(a.names[0]) < packages.indexOf(b.names[0])) return -1;
    return 0;
  }
}
