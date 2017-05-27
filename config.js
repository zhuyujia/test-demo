'use strict';

var build = './build',
    src = './src',
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
    server: {
        root: build,
        open: 'local'   // false, 'local', 'external', 'ui', 'tunnel'
    }
};