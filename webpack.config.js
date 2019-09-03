var path = require('path');
const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');
const env = process.env.NODE_ENV || 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDevelopment = env == 'development';
module.exports = {
    mode: env,
    entry: {
        main: path.join(__dirname, 'src/app.tsx')
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(jsx|tsx|js|ts)$/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options : {
                        bail: true,
                        useCache: true,
                        reportFiles: [
                            'src/**/*.{ts,tsx}'
                        ],
                        getCustomTransformers: () => ({
                            before: [ tsImportPluginFactory( {
                                libraryDirectory: 'es',
                                style: 'css'
                              }) ]
                        }),
                        compilerOptions: {
                            module: 'esnext',
                            allowJs: true,
                            declaration: false,
                        }
                    }
                },
                exclude: /node_modules/
            },
            { test: /\.png$|\.eot$|\.woff$|\.ttf$/, loader: "url-loader?limit=100000" },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                include: /src\/app.css|node_modules\/antd\/|node_modules\/@kartikrao\//
            }
        ]
    },
    devtool: 'source-map',
    output: {
        filename: '[name].bundle.js', /* Independent Entry Bundle */
        chunkFilename: '[name].chunk.js', /* Code splitting generated bundles */
        path: path.join(__dirname, 'dist')
    },
    watchOptions: {
        ignored: /node_modules/
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.css'],
        alias: { mobx: __dirname + "/node_modules/mobx/lib/mobx.es6.js" }
    },
    externals: {
        "antd" : "antd",
        "react": "React",
        "react-dom": "ReactDOM",
        "moment" : "moment",
        "moment-timezone": "moment"
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new CheckerPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-au/),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[id].chunk.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'public/template.html',
            filename: "index.html"
        })
        // new BundleAnalyzerPlugin()
    ],
    devServer : {
        compress: true,
        hot: true,
        port: 8082
    },
    optimization: {
        runtimeChunk: isDevelopment,
        minimize: !isDevelopment,
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                // vendor chunk
                vendor: {
                    // sync + async chunks
                    chunks: 'all',
                    // import file path containing node_modules
                    test: /node_modules/,
                    priority: 20
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'async',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    }
};