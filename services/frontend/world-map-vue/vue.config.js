const { defineConfig } = require("@vue/cli-service/");

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.module
      .rule("geojson")
      .test(/\.geojson$/)
      .use("json-loader")
      .loader("json-loader")
      .end();
  },
});
