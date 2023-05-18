var path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.cjs");

module.exports = merge(common, {
  entry: {
		//	context: path.join(__dirname, 'src'),
		server: path.join(__dirname, "src", "services", "course-prod-mesh.js"),
	},
  mode: "production",
  devtool: "inline-source-map",
  output: {
    devtoolModuleFilenameTemplate:
      "webpack://[namespace]/[resource-path]?[loaders]",
  },
});
