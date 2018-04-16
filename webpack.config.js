var path = require('path');
var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const env = process.env.NODE_ENV;

module.exports = {
    entry: path.join(__dirname, 'src/index.tsx'),
    target: 'web',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: { loader: 'ts-loader' }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    allChunks: true,
                    fallback: "style-loader",
                    use: "css-loader"
                  })
            }
        ],
    },
    externals: {
        'react': 'React',
        'react-dom' : 'ReactDOM',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css']
    },
    output: {
        libraryTarget: 'window',
        library: 'Forms',
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist/"),
        port: 8080
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
            "ReactDOM": "react-dom",
        }),
        new HtmlWebpackPlugin({
            template: 'build/template.html',
            inject: false,
        }),
        new ExtractTextPlugin("style.css")
    ]
};