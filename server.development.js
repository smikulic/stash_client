var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./scripts/webpack.development.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: false,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
