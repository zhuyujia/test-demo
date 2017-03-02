// npm install --save-dev gulp del gulp-sass gulp-sourcemaps gulp-file-include gulp-livereload gulp-mock-server
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
    browserSync = require('browser-sync'),
    middleware = require('./middleware');

// 清除 dist
gulp.task('clean', function () {
    return del.sync(config.clean.dist);
});

// html 合并
gulp.task('html', function () {
    return gulp.src(config.html.src)
        .pipe(fileinclude())
        .pipe(gulp.dest(config.html.dist));
});

// sass 编译
gulp.task('sass', function () {
    return gulp.src(config.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.sass.dist));
});

// js 处理
gulp.task('js', function () {
    return gulp.src(config.js.src)
        .pipe(gulp.dest(config.js.dist));
});

// 接口服务器
gulp.task('mockserver', function () {
    return gulp.src('.')
        .pipe(mockServer({
            port: 8000,
            mockDir: config.mockDir
        }));
});

// 静态服务器
gulp.task('browsersync', function() {
    // 监听 html，sass，js
    gulp.watch(config.html.all, ['html']).on('change', browserSync.reload);
    gulp.watch(config.sass.all, ['sass']).on('change', browserSync.reload);
    gulp.watch(config.js.src, ['js']).on('change', browserSync.reload);

    browserSync.init({
        server: {
            baseDir: config.serverRoot,
            middleware: middleware
        }
    });
});

gulp.task('default', ['clean', 'html', 'sass', 'js', 'mockserver', 'browsersync']);