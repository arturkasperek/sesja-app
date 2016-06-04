var path = require('path');
var webpack = require('webpack');
var output = __dirname;
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/main.js',
    output: { path: output, filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', !isProduction ? 'react-hmre' : undefined]
                }
            }
        ]
    },
    plugins: isProduction ? [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: true
        })
    ]:
    [],
};