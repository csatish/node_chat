const merge = require('webpack-merge');
const common = require('./webpack.common.config')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer')
const path = require('path')

const relativePath = '../server/files/js/prod'
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BUILD_ROOT = path.join(__dirname,relativePath)
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new ProgressBarPlugin(),
    ],
    output: {
        path: BUILD_ROOT,
        filename: '[name]-bundle.js',
        chunkFilename: '[name]-chunk.js',
        publicPath: path.join(__dirname, relativePath)
    },
    module: {
        rules: [
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use a plugin to extract that CSS to a file, but
            // in development "style" loader enables hot editing of CSS.
            {
                test: /\.(sa|sc|c)ss$/,
                //exclude: /node_modules/,
                use: [
                    'style-loader',
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
            }
        ]
    }
})
