import Koa from 'koa'
import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import proxy from 'koa-proxy'
import _debug from 'debug'
import config from '../config'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'

const debug = _debug('app:server');
const paths = config.utils_paths;
const app = new Koa();


if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)))
}

app.use(convert(historyApiFallback({
  verbose: false,
  // rewrites: [
  //   { from: /\/wx\//, to: '/index.wx.html'},
  //   { from: /\/app\//, to: '/index.app.html'}
  // ],
  index:`/index.${config.platform}.html`
})));

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig);

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output;

  app.use(webpackDevMiddleware(compiler, publicPath));
  app.use(webpackHMRMiddleware(compiler));
  app.use(serve(paths.client('static')))
} else {
  app.use(serve(paths.dist()))
}

export default app
