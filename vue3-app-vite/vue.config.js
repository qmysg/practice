module.exports = {
  devServer: {
    proxy: {
      "/": {
        // target: "http://test.my-site.com",
        target: "http://127.0.0.1:3001/",
      },
    },
  },
  configureWebpack: require("./webpack.config"),
};
