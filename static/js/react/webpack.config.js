var path = require('path');

module.exports = {
    entry: './react-custom.js',
    output: {
        path: path.resolve(__dirname,'./build'),
        filename: '[name].js',
    },

    module: {
        loaders: [{
            test: /\.js[x]?$/i, 
            loader: 'babel-loader'
        }]
    },
    externals: {

    }
};