import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import webpackConfig from '../../webpack.config';
import path from 'path';

const app = express();
app.use(middleware(webpack(webpackConfig)));
app.use(bodyParser.json());
// app.use(express.static(path.resolve(__dirname, '../../public')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.listen(4800, () => {
    console.log('SERVER RUNNING ON THE 4500 PORT')
});
