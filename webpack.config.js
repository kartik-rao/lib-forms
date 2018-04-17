var path = require('path');
var webpack = require('webpack');

const env = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: env,
    entry: {
        main: path.join(__dirname, 'src/index.tsx')

    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: { loader: 'awesome-typescript-loader' },
                exclude: /\/node_modules\//
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    allChunks: true,
                    fallback: "style-loader",
                    use: "css-loader"
                  }),
                include: /node_modules\/antd|src\/app.css/
            }
        ],
    },
    // externals: {
    //     'react': 'React',
    //     'react-dom' : 'ReactDOM',
    // },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.css'],
        // alias: {
        //     // external libraries
        //     React: path.resolve('node_modules/react/index.js'),
        //     ReactDOM: path.resolve('node_modules/react-dom/index.js'),
        // }
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
        new CheckerPlugin(),
        // new webpack.ProvidePlugin({
        //     "React": "react",
        //     "ReactDOM": "react-dom",
        // }),
        new HtmlWebpackPlugin({
            template: 'build/template.html',
            inject: false,
        }),
        new ExtractTextPlugin("style.css")
    ],
    optimization: {
        // runtimeChunk: {
        //     name: 'manifest'
        // },
        splitChunks: {
            chunks: "initial",
            name: "vendor"
            // cacheGroups: {
            // default: false,
            // vendor: {
            //     test: /[\\/]node_modules[\\/]/,
            //     name: 'vendor',
            //     chunks: 'initial',
            //     priority: -20
            // }
            // }
        }
    }
};