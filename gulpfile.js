// npm install --save-dev gulp del browser-sync gulp-sass gulp-sourcemaps gulp-file-include
// 新增插件-雪碧图 npm install --save-dev gulp-css-spriter/gulp.spritesmith
// 后期新增插件-生成版本号 npm install --save-dev gulp-rev gulp-rev-collector

'use strict';

var gulp = require('gulp'),
    config = require('./config'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    fileinclude = require('gulp-file-include');

// 清除 dist 文件夹
gulp.task('clean', function() {
    return del.sync([config.clean.dest]);
});

// 配置服务器
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: config.browserSync.baseDir
        },
        port: config.browserSync.port
    });
    // 监听 html，sass，js
    gulp.watch(config.html.all, ['html']).on('change', browserSync.reload);
    gulp.watch(config.sass.all, ['sass']).on('change', browserSync.reload);
    gulp.watch(config.js.src, ['js']).on('change', browserSync.reload);
});

// html 整合
gulp.task('html', function() {
    return gulp.src([config.html.src])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(config.html.dest));
});

// sass 编译
gulp.task('sass', function() {
    return gulp.src(config.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.sass.dest));
});

// js 处理
gulp.task('js', function() {
    return gulp.src(config.js.src)
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('default', ['clean', 'html', 'sass', 'js', 'serve']);