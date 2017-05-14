'use strict';
var ejs = require('ejs'), str = require('fs').readFileSync(__dirname + '/view.ejs', 'utf8');

var ret = ejs.render(str, {
    list: ['foo', 'bar', 'baz']
});

console.log(ret);

var oList = document.querySelector('#list');

oList.innerHTML = ret;