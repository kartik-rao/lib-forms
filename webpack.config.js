var path = require('path');
const webpack = require('webpack');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const tsImportPluginFactory = require('ts-import-plugin');
const tsImportPlugin = tsImportPluginFactory({ libraryName:"antd", style: 'css', libraryDirectory: 'es' })

const env = process.env.NODE_ENV || 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: env,
    entry: {
        main: [path.join(__dirname, 'src/index.tsx'), 'webpack-plugin-serve/client'],
        style: path.join(__dirname, 'src/app.css')
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(jsx|tsx|js|ts)$/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options : {
                        useCache: true,
                        reportFiles: [
                            'src/**/*.{ts,tsx}'
                        ],
                        getCustomTransformers: () => ({
                            before: [ tsImportPlugin ]
                        }),
                        compilerOptions: {
                            module: 'esnext'
                        }
                    }
                },
                exclude: /node_modules/
            },
            { test: /\.png$|\.eot$|\.woff$|\.ttf$/, loader: "url-loader?limit=100000" },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    allChunks: true, fallback: "style-loader", use: "css-loader"
                  }),
                include: /src\/app.css|node_modules\/antd\//
            }
        ],
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: 'Forms',
        libraryTarget: 'window'
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.css'],
    },
    externals: {
        "antd" : "antd",
        "react": "React",
        "react-dom": "ReactDOM",
        "moment" : "moment",
        "moment-timezone": "moment"
    },
    devServer: {
        compress: true,
        hot: true,
        contentBase: [[path.join(__dirname, 'public'), path.join(__dirname, 'assets')]],
        port: 8080
    },
    plugins: [
        new CheckerPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-au/),
        new HtmlWebpackPlugin({template: 'public/template.html', inject: false}),
        new ExtractTextPlugin({filename:"style.css", allChunks: true}),
        new Serve({compress: true, client: {address: 'localhost:8080'}, liveReload: true})
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: false,
        splitChunks: { chunks: "initial", name: "vendor" }
    },
    watch: true
};