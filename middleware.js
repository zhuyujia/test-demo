'use strict';

var proxyMiddleware = require('http-proxy-middleware'),
    config = require('./config');
var filter = function (pathname, req) {
    return (pathname.match('^/') && req.method === 'POST');
};

module.exports = (function () {
    var _target = 'http://localhost:' + config.mock.port;
    return [proxyMiddleware(filter, {target: _target, changeOrigin: true})];
}());