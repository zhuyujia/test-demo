'use strict';

var src = './app/src',
    srcTemplate = src + '/template',
    srcStatic = src + '/static',
    dest = './app/dist';

module.exports = {
    browserSync: {
        baseDir: dest
    },
    clean: {
        dest: dest
    },
    html: {
        all: srcTemplate + '/**/*.html',
        src: srcTemplate + '/*.html',
        dest: dest
    },
    sass: {
        all: srcStatic + '/sass/*.sass',
        src: srcStatic + '/sass/style.scss',
        dest: dest + '/css'
    },
    images: {
        src: srcStatic + '/images/**/*',
        dest: dest + '/images'
    },
    js: {
        src: srcStatic + '/js/*.js',
        dest: dest + '/js'
    }
};