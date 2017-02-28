// npm install --save-dev gulp del browser-sync gulp-sass gulp-sourcemaps gulp-file-include gulp-livereload gulp-mock-server gulp-webserver
// 后期新增插件-雪碧图 npm install --save-dev gulp-css-spriter/gulp.spritesmith
// 后期新增插件-生成版本号 npm install --save-dev gulp-rev gulp-rev-collector
'use strict';
var gulp = require('gulp'),
    config = require('./config'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    fileinclude = require('gulp-file-include'),
    livereload = require('gulp-livereload'),
    mockServer = require('gulp-mock-server'),
    webserver = require('gulp-webserver');

// 清除 dist 文件夹
gulp.task('clean', function () {
    return del.sync(config.clean.dest);
});

// html 整合
gulp.task('html', function () {
    return gulp.src(config.html.src)
        .pipe(fileinclude())
        .pipe(gulp.dest(config.html.dest));
});

// sass 编译
gulp.task('sass', function () {
    return gulp.src(config.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.sass.dest));
});

// js 处理
gulp.task('js', function () {
    return gulp.src(config.js.src)
        .pipe(gulp.dest(config.js.dest));
});

// 配置服务器 mockserver
gulp.task('mockserver', function () {
    // 监听 html，sass，js
    gulp.watch(config.html.all, ['html']);
    gulp.watch(config.sass.all, ['sass']);
    gulp.watch(config.js.src, ['js']);
    return gulp.src('./app')
        .pipe(mockServer({
            port: 8000,
            livereload: true,
            open: true,
            mockDir: './app/data',
            directoryListing: {
                enable: true,
                path: './app'
            }
        }));
});

gulp.task('default', ['clean', 'html', 'sass', 'js', 'mockserver']);