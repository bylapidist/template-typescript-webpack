const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const paths = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    dist: path.resolve(__dirname, 'dist')
};

module.exports = {
    devtool: 'source-map',
    entry: paths.entry,
    optimization: {
        moduleIds: 'named',
        minimize: true,
        splitChunks: {
            chunks: 'initial'
        },
        minimizer: [
            new ESBuildMinifyPlugin({
                target: 'es2015'
            })
        ]
    },
    bail: true,
    output: {
        filename: '[name].[contenthash].min.js',
        path: paths.dist
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        mainFiles: ['index'],
        modules: [path.resolve('./src'), path.resolve('./node_modules')],
        alias: {
            lapidist: path.resolve('./src')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es2015'
                }
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'source-map-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'App',
            filename: 'index.html',
            template: 'public/index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './public/',
                    to: './',
                    force: true,
                    globOptions: {
                        ignore: ['**/*.html']
                    }
                }
            ]
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ]
};
