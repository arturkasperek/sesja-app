var path = require('path');
var webpack = require('webpack');
var output = __dirname;
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    context: __dirname,
    entry: [
        './frontend/main.js'
    ].concat(!isProduction ? ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'] : []),
    output: {
        path: __dirname + '/build/frontend',
        publicPath: '',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', !isProduction ? 'react-hmre' : undefined],
                    plugins: ['transform-decorators-legacy']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
        ]
    },
    plugins: isProduction ? [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: true
        })
    ]:
    [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
};