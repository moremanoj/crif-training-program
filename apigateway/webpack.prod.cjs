var path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.cjs");

module.exports = merge(common, {
  mode: "production",
  entry: {
		//	context: path.join(__dirname, 'src'),
		server: path.join(__dirname, "src", "services", "web-prod-mesh.js"),
	},
	devtool: "inline-source-map",
	output: {
	  devtoolModuleFilenameTemplate:
		"webpack://[namespace]/[resource-path]?[loaders]",
	},
});
