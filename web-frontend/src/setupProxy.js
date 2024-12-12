const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `${process.env.BACKEND_URL || 'http://localhost'}:${process.env.BACKEND_PORT || 3000}`,
      changeOrigin: true,
    })
  );
};
