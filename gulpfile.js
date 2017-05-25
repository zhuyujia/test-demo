// 后期新增插件-雪碧图 npm install --save-dev gulp-css-spriter/gulp.spritesmith
// 后期新增插件-生成版本号 npm install --save-dev gulp-rev gulp-rev-collector

'use strict';

var gulp = require('gulp'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
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

// 清除 build
gulp.task('clean', function () {
    return del.sync(config.clean.build);
});

// html 整合
gulp.task('html:dev', function () {
    return gulp.src(config.html.src)
        .pipe(plumber())
        .pipe(ejs())
        .pipe(gulp.dest(config.html.build))
        .pipe(reload({
            stream: true
        }));
});

// html 打包
gulp.task('html:build', function () {
    return gulp.src(config.html.src)
        .pipe(ejs())
        .pipe(gulp.dest(config.html.build));
});

// sass 编译
gulp.task('sass:dev', function () {
    return gulp.src(config.sass.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: config.sass.loadPaths
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(rename(function (path) {
            path.dirname = '';
        }))
        .pipe(gulp.dest(config.sass.build))
        .pipe(reload({
            stream: true
        }));
});

// sass 打包
gulp.task('sass:build', function () {
    return gulp.src(config.sass.src)
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: config.sass.loadPaths
        }))
        .pipe(rename(function (path) {
            path.dirname = '';
        }))
        .pipe(gulp.dest(config.sass.build));
});

// js 处理
gulp.task('js:dev', function () {
    // browserify 只能预编译单个 js，可以使用 node-glob 进行多个 js 进行预编译，具体地址：http://www.tuicool.com/articles/MFjAZn6
    // 建议使用 through2
    return browserify('./src/pages/index/index.js')
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(gulp.dest(config.js.build))
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
gulp.task('browsersync', function () {
    // 监听 html，sass，js
    gulp.watch(config.html.all, ['html:dev']);
    gulp.watch(config.sass.src, ['sass:dev']);
    gulp.watch(config.js.all, ['js:dev']);

    browserSync.init({
        server: {
            baseDir: config.serverRoot,
            middleware: middleware
        }
    });
});

gulp.task('dev', ['clean', 'html:dev', 'sass:dev', 'js:dev', 'mockserver', 'browsersync']);

gulp.task('build', ['clean', 'html:build', 'sass:build']);