module.exports = (api, options, rootOptions) => {
  api.render('./template', options);
  api.extendPackage({
    scripts: {
      upload: 'node deploy.js --mode=test',
      uploadzs: 'node deploy.js --mode=prod'
    },
    dependencies: {
      'vue': '^2.6.10',
      'vue-router': '^3.0.1',
      'vuex': '^3.1.0',
      'axios': '^0.19.0',
      "element-ui": "^2.9.1",
      'qs': "^6.6.0",
      'lodash': '^4.17.11'
    },
    devDependencies: {
      'compression-webpack-plugin': '^3.0.0',
      'babel-plugin-component': '^1.1.1',
      "simple-scp": "^1.0.0"
    }
  });
};
