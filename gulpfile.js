// 后期新增插件-雪碧图 npm install --save-dev gulp-css-spriter/gulp.spritesmith
// 后期新增插件-生成版本号 npm install --save-dev gulp-rev gulp-rev-collector

'use strict';

var gulp = require('gulp'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    mockServer = require('gulp-mock-server'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    ejs = require('gulp-ejs'),
    middleware = require('./middleware'),
    config = require('./config');

// 清除 dist
gulp.task('clean', function () {
    return del.sync(config.clean.dist);
});

// html 合并
gulp.task('html', function () {
    return gulp.src(config.html.src)
        .pipe(plumber())
        .pipe(ejs())
        .pipe(gulp.dest(config.html.dist))
        .pipe(reload({
            stream: true
        }));
});

// sass 编译
gulp.task('sass', function () {
    return gulp.src(config.sass.src)
        .pipe(plumber())
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
    // browserify 只能预编译单个 js，可以使用 node-glob 进行多个 js 进行预编译，具体地址：http://www.tuicool.com/articles/MFjAZn6
    return browserify('./app/src/static/js/index.js')
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
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