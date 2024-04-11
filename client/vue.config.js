const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "AV_Academy",
    workboxOptions: {
      exclude: ["_redirects"],
    }
  }
})
