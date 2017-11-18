var path = require('path');

module.exports = {
    entry: {
		'index':'./index.js',
		'login':'./login.js'
    },
    output: {
        path: path.resolve(__dirname,'./build'),
        filename: '[name].js',
		libraryTarget: 'umd'
    },

    module: {
        loaders: [{
            test: /\.js[x]?$/i, 
            loader: 'babel-loader',
			exclude: /node_modules/
        }]
    },
    externals: {
			'react': {
			'commonjs': 'react',
			'commonjs2': 'react',
			'amd': 'react',
			// React dep should be available as window.React, not window.react
			'root': 'React'
			 },'react-dom': {
				'commonjs': 'react-dom',
				'commonjs2': 'react-dom',
				'amd': 'react-dom',
				'root': 'ReactDOM'
			  }
    }
};