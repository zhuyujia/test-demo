'use strict';

var proxyMiddleware = require('http-proxy-middleware');
var filter = function (pathname, req) {
    return (pathname.match('^/') && req.method === 'POST');
};

module.exports = (function () {
    return [proxyMiddleware(filter, {target: 'http://localhost:8000', changeOrigin: true})];
}());