const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.entry = "./src/app/index.js";
      paths.appBuild = webpackConfig.output.path = path.resolve("./build");
      return webpackConfig;
    },
  },
};
