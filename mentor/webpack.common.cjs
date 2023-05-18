var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
var nodeExternals = require("webpack-node-externals");

module.exports = {
	target: "node",
	externals: [nodeExternals()],
	node: {
		__dirname: true,
		__filename: true,
	},
	output: {
		path: path.join(__dirname, "dist/binary"),
		filename: "[name].bundle.js",
		library: "[name]",
		libraryTarget: "commonjs2",
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				resolve: {
					fullySpecified: false,
				},
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-proposal-object-rest-spread"],
					},
				},
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "package-dist.json", to: "./../package.json" },
				{ from: "./config/node-environment.json", to: "./../config/node-environment.json" },
			],
		}),
	],
};
