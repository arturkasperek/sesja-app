import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import express from 'express';
import config from './webpack.config.js';

const isProduction = process.env.NODE_ENV === 'production';
const app = express();

if(!isProduction) {
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true, publicPath: config.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
}

app.use(express.static(__dirname + '/frontend'));

app.use(function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));