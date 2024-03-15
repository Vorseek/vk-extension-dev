const path = require('path');

const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const srcDir = path.join(__dirname, '..', 'src');

module.exports = {
	entry: {
		background_worker: path.join(srcDir, '/entrypoints/background_worker.ts'),
		popup: path.join(srcDir, '/entrypoints/popup.tsx'),
		all_page: path.join(srcDir, '/entrypoints/all_page.ts'),
	},
	output: {
		path: path.join(__dirname, '../dist/js'),
		filename: '[name].js',
	},
	optimization: {
		splitChunks: {
			name: 'vendor',
			chunks(chunk) {
				return chunk.name !== 'background';
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	plugins: [
		new Dotenv({
			path: path.join(__dirname, '../.env'),
		}),
		new CopyPlugin({
			patterns: [{ from: '.', to: '../', context: 'public' }],
			options: {},
		}),
	],
};
