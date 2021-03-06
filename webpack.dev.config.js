const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const port = process.env.PORT || 3001;

const paths = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    dist: path.resolve(__dirname, 'dist')
};

module.exports = {
    devtool: 'eval-source-map',
    devServer: {
        port,
        https: false,
        historyApiFallback: true,
        compress: true,
        open: true,
        static: {
            directory: paths.dist,
            publicPath: '/',
            serveIndex: true,
            watch: true
        },
        client: {
            overlay: true
        }
    },
    entry: [paths.entry, `webpack-dev-server/client?http://0.0.0.0:${port}`],
    optimization: {
        moduleIds: 'named',
        splitChunks: {
            chunks: 'initial'
        }
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
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /\.module\.css$/
            },
            {
                test: /\.svg$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'App',
            filename: 'index.html',
            template: 'public/index.html',
            inject: 'body',
            baseUrl: '/'
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
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd()
        })
    ]
};
