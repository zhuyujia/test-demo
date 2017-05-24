'use strict';

var build = './app/build',
    src = './app/src',
    pagesSrc = src + '/pages',
    pagesBuild = build + '/pages',
    staticsBuild = build + '/statics',
    maps = '../maps';

module.exports = {
    clean: {
        build: build
    },
    html: {
        all: pagesSrc + '/**/*.html',
        src: pagesSrc + '/**/!(_)*.html',
        build: pagesBuild
    },
    sass: {
        src: pagesSrc + '/**/*.scss',
        loadPaths: [src + '/framework/sass/'],
        build: staticsBuild + '/css'
    },
    js: {
        all: pagesSrc + '/**/*.{js,ejs}',
        src: pagesSrc + '/**/*.js',
        maps: maps,
        build: staticsBuild + '/js'
    },
    mock: {
        dir: src + '/mock',
        port: 8000
    },
    serverRoot: build
};