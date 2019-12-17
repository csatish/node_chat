const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require('autoprefixer')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
require("@babel/register");

/***  Changes to do ***
 * relativePath
 * HtmlPluginMobile template(input) and filename(output)
 * HtmlPluginWeb template(input) and filename(output)
 * entry paths
 * output publicPath
 **/


const relativePath = '../server/files/js/dev/'
const BUILD_ROOT = path.join(__dirname,relativePath)
const PUBLIC_PATH = '/js/dev/'
const DESKTOP_ENTRY = './src/setup/App.js'
const MOBILE_ENTRY = './src/setup/MobileApp.js'
const DESKTOP_INPUT_HTML = './index.html'
const MOBILE_INPUT_HTML = './indexMob.html'
const DESKTOP_OUTPUT_HTML = '../server/views/app.ejs'
const MOBILE_OUTPUT_HTML = '../server/views/mobApp.ejs'

const mode  = process.env.NODE_ENV
const devMode = mode !== "production"
console.log("Build mode:", mode)

const HtmlPluginMobile = new HtmlWebPackPlugin({
    title: 'MChat',
    chunks: ['mobile'],
    // excludeChunks: ['desktop_test'], useful to avoid unit test files
    template: MOBILE_INPUT_HTML,
    filename: path.resolve(__dirname, MOBILE_OUTPUT_HTML)
});

const HtmlPluginWeb = new HtmlWebPackPlugin({
    title: 'Chat',
    chunks: ['desktop'],
    // excludeChunks: ['mobile_test'], useful to avoid unit test files
    template: DESKTOP_INPUT_HTML,
    filename: path.resolve(__dirname, DESKTOP_OUTPUT_HTML)
});

module.exports = {
    entry: {
        desktop:DESKTOP_ENTRY,
        mobile:MOBILE_ENTRY,
    },
    output: {
        filename: '[name].bundle.[hash].js',
        chunkFilename: '[name].chunk.[hash].js',
        publicPath: PUBLIC_PATH,
        path: BUILD_ROOT,
    },
    watchOptions: {
        poll: false,
        ignored: /node_modules/
    },
    // stats: "verbose", //default :- normal,
    devtool: devMode ? 'source-map' : false,
    mode: mode,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            //Support for fonts with css for font-awesome to import file
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader"
            },
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use a plugin to extract that CSS to a file, but
            // in development "style" loader enables hot editing of CSS.
            {
                test: /\.(sa|sc|c)ss$/,
                //exclude: /node_modules/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    Browserslist: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
        ]
    },
    plugins: [
        HtmlPluginWeb,
        HtmlPluginMobile,
        new CleanWebpackPlugin(),
        new ProgressBarPlugin(),
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: devMode ? '[name].css' : '[name].[hash].css',
        //     chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        // }),
        // // This makes it possible for us to safely use env vars on our code
        new webpack.DefinePlugin({
            DEVELOPMENT: JSON.stringify(devMode)
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                chunks: 'all',
            }
        },
    }
}


