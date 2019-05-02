import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import path from 'path';
import favicon from 'express-favicon';
import webpackConfig from '../../webpack.config';
import api from './routes';

const app = express();
app.use(middleware(webpack(webpackConfig)));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../../public')));
app.use(favicon(path.resolve(__dirname, '../../public/assets/favicon.ico')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, File-Format")
    res.header("Content-Type", "application/json")
    next();
});

app.use('/api', api);

app.listen(4800, () => {
    console.log('SERVER RUNNING ON THE 4800 PORT')
});
