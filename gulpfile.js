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
    mockServer = require('gulp-mock-server'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    middleware = require('./middleware');

// 清除 dist
gulp.task('clean', function () {
    return del.sync(config.clean.dist);
});

// html 合并
gulp.task('html', function () {
    return gulp.src(config.html.src)
        .pipe(fileinclude())
        .pipe(gulp.dest(config.html.dist))
        .pipe(reload({
            stream: true
        }));
});

// sass 编译
gulp.task('sass', function () {
    return gulp.src(config.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.sass.dist))
        .pipe(reload({
            stream: true
        }));
});

// js 处理
gulp.task('js', function () {
    return gulp.src(config.js.src)
        .pipe(gulp.dest(config.js.dist))
        .pipe(reload({
            stream: true
        }));
});

// 接口服务器
gulp.task('mockserver', function () {
    return gulp.src('.')
        .pipe(mockServer({
            port: config.mock.port,
            mockDir: config.mock.dir
        }));
});

// 静态服务器
gulp.task('browsersync', function() {
    // 监听 html，sass，js
    gulp.watch(config.html.all, ['html']);
    gulp.watch(config.sass.all, ['sass']);
    gulp.watch(config.js.src, ['js']);

    browserSync.init({
        server: {
            baseDir: config.serverRoot,
            middleware: middleware
        }
    });
});

gulp.task('default', ['clean', 'html', 'sass', 'js', 'mockserver', 'browsersync']);