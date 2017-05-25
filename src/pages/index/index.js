'use strict';
var ejs = require('ejs'),
    fs = require('fs'),
    str = fs.readFileSync(__dirname + '/tpl/view.ejs', 'utf8');

var ret = ejs.render(str, {
    list: ['foo', 'bar', 'baz']
});

var oList = document.querySelector('#list');

oList.innerHTML = ret;