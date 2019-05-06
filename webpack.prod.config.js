const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 1000000,
        maxAssetSize: 1000000
    }
};
