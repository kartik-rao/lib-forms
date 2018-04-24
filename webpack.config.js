var path = require('path');
var webpack = require('webpack');

const env = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: env,
    entry: {main: path.join(__dirname, 'src/index.tsx'), style: path.join(__dirname, 'src/app.css')},
    target: 'web',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: { loader: 'awesome-typescript-loader' },
                exclude: /\/node_modules\//
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
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.css'],
    },
    output: {
        libraryTarget: 'window',
        library: 'Forms',
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, "dist/"),
        port: 8080
    },
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({template: 'build/template.html', inject: false}),
        new ExtractTextPlugin({filename:"style.css", allChunks: true})
    ],
    optimization: {
        minimize: true,
        splitChunks: { chunks: "initial", name: "vendor" }
    }
};