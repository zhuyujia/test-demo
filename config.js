'use strict';

var dist = './app/dist',
    src = './app/src',
    srcTemplate = src + '/template',
    srcStatic = src + '/static';

module.exports = {
    clean: {
        dist: dist
    },
    html: {
        all: srcTemplate + '/**/*',
        src: srcTemplate + '/*.html',
        dist: dist
    },
    sass: {
        all: srcStatic + '/sass/**/*.scss',
        src: srcStatic + '/sass/style.scss',
        dist: dist + '/css'
    },
    images: {
        src: srcStatic + '/images/**/*',
        dist: dist + '/images'
    },
    js: {
        src: srcStatic + '/js/**/*.js',
        dist: dist + '/js'
    },
    mock: {
        dir: src + '/data',
        port: 8000
    },
    serverRoot: dist
};