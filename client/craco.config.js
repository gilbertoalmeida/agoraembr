const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: { "@primary-color": "#e3b23c", "@link-color": "#005154" },
          javascriptEnabled: true
        }
      }
    }
  ]
};
