const baseConfig = require("./webpack.config");
const merge = require("webpack-merge");
const serve = require("../server/server.js");

module.exports = merge(baseConfig, {
  devtool: "#eval-source-map",
  devServer: {
    hot: true,
    compress: true,
    port: 5888,
    open: true,      // 自动打开的可能是 0.0.0.0, 自己替换为 localhost
    host: '0.0.0.0', // 这个配置是为了能让局域网内都能打开
    proxy: {
      "/": {
        target: "http://localhost:18888",
        changeOrigin: true, // 如果你需要更改源，可以设置为true
        pathRewrite: { "^/": "" }, // 如果需要重写路径，可以在这里设置
      },
      "*": "http://localhost:18888"
    },
    before() {
      serve.run(18888, "n");
    }
  }
});
