var path = require('path'),
	webpack = require("webpack");

var mapboxApiAccessToken = process.env.MAPBOX_API_ACCESS_TOKEN ||
  'pk.eyJ1IjoiYWxwYWNhdHJhdmVsIiwiYSI6ImNpazY0aTB6czAwbGhoZ20ycHN2Ynhlc28ifQ.GwAeDuQVIUb4_U1mT-QUig';

var config = {
	entry: [
    path.resolve(__dirname, 'src/index.jsx'),
  ],
	output: {
		path: path.resolve(__dirname, 'web'),
		publicPath: '/',
		filename: 'bundle.js'
	},
  target: "web",
	plugins: [
    new webpack.DefinePlugin({
			'process.env': {
				'MAPBOX_API_ACCESS_TOKEN': JSON.stringify(mapboxApiAccessToken),
			}
		})
	],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015', 'stage-1'],
			}
		}, {
      test: /\.json$/,
      loader: 'json',
    }],
    noParse: [
      /mapbox-gl-style-spec\/migrations.+/,
      /jsonlint-lines.+/
    ],
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.jsx', '.js'],
		alias: {
      'mapbox-gl': path.resolve(__dirname, '../node_modules/mapbox-gl/dist/mapbox-gl.js')
		}
	},
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, 'web'),
		watchOptions: {
			poll: true
		}
	}
};

module.exports = config;
