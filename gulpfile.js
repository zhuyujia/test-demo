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
    return del([config.clean.dest]);
});

// 配置服务器
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: config.browserSync.baseDir
        },
        port: 8000
    });

    gulp.watch(config.html.all, ['html']);
    gulp.watch(config.sass.all, ['sass']);
    gulp.watch(config.js.src, ['js']);
});

// html 整合
gulp.task('html', function() {
    return gulp.src([config.html.src])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(config.html.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// sass 编译
gulp.task('sass', function() {
    return gulp.src(config.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.sass.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// js 处理
gulp.task('js', function() {
    return gulp.src(config.js.src)
        .pipe(gulp.dest(config.js.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('default', ['clean'], function() {
    gulp.start('html', 'sass', 'js', 'serve');
});