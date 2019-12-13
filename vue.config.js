// vue.config.js
module.exports = {
  // https://webpack.js.org/configuration/dev-server/#devserver-disablehostcheck
  devServer: {
    // host: '0.0.0.0',
    host: 'localhost',
    // port: 8080,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  }
};
