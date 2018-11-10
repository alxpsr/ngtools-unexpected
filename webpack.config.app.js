const path = require('path');
const webpack = require('webpack');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let nodeExternals = require('webpack-node-externals');
let helpers = require('./config/helpers');

module.exports = function(stat) {
  const isAdaptive = !(!process.env.IS_ADAPTIVE);

  let entryPoints = {
    polyfills: './src-server/polyfills.ts'
  }
  
  const aotPluginOptions = {};

  const htmlPluginOptions = {
    template: './src-server/index.html',
  }

  if (isAdaptive) {
    entryPoints['adaptive-app'] = './src-server/main.adaptive.ts';
    aotPluginOptions['tsConfigPath'] = helpers.root('tsconfig.app.adaptive.json');
    aotPluginOptions['entryModule'] = helpers.root("src-server/app/app.adaptive.module#AppAdaptiveModule");
    aotPluginOptions['mainPath'] = helpers.root('src-server/main.adaptive.ts');
    htmlPluginOptions['filename'] = 'index.adaptive.html';
    htmlPluginOptions['chunks'] = ['adaptive-app', 'polyfills', 'runtime'];
    chunksSortMode: sortChunk(['runtime', 'polyfills', 'adaptive-app']);
  } else {
    entryPoints['desktop-app'] = './src-server/main.web.ts';
    aotPluginOptions['tsConfigPath'] = helpers.root('tsconfig.app.json');
    aotPluginOptions['entryModule'] = helpers.root("src-server/app/app.web.module#AppWebModule");
    aotPluginOptions['mainPath'] = helpers.root('src-server/main.web.ts');
    htmlPluginOptions['filename'] = 'index.html';
    htmlPluginOptions['chunks'] = ['desktop-app', 'polyfills', 'runtime'];
    chunksSortMode: sortChunk(['runtime', 'polyfills', 'desktop-app']);
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
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack'
        },
        // {
        //   test: /\.ts?$/,
        //   use: [{
        //     loader: 'ts-loader',
        //     options: {
        //       transpileOnly: true,
        //       configFile: helpers.root('tsconfig.app.json')
        //     }
        //   },
        //     'angular2-template-loader',

        //   ],
        //   exclude: [/\.(spec|e2e)\.ts$/]
        // },
        { test: /\.html$/, loader: 'html-loader', options: { minimize: true, removeAttributeQuotes: false, caseSensitive: true, customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]], customAttrAssign: [/\)?\]?=/] } },
      ]
    },
    node: {
      crypto: true,
      stream: true,
    },
    optimization: {
      minimize: !helpers.isDev(),
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
    plugins: [
      // Build all App
      new AngularCompilerPlugin(aotPluginOptions),
      new HtmlWebpackPlugin(htmlPluginOptions),
    ],
  }
}

function sortChunk(packages) {
  return function sort(a, b) {
    if (packages.indexOf(a.names[0]) > packages.indexOf(b.names[0])) return 1;
    if (packages.indexOf(a.names[0]) < packages.indexOf(b.names[0])) return -1;
    return 0;
  }
}
