// npm install --save-dev gulp del gulp-sass gulp-sourcemaps gulp-file-include browser-sync

'use strict';

var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create();

// 清除 dist 文件夹
gulp.task('clean:dist', function() {
    del(['app/dist/**/*']);
});

// html 整合
gulp.task('html', function() {
    return gulp.src(['app/src/template/**/*.html', '!app/src/template/inc/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('app/dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// sass 编译
gulp.task('sass', function() {
    return gulp.src('app/src/static/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 配置服务器
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: 'app/dist'
        },
        port: 8000
    });

    gulp.watch('app/src/template/**/*', ['html']);
    gulp.watch('app/src/static/sass/*.scss', ['sass']);
});

gulp.task('default', ['clean:dist', 'html', 'sass', 'serve']);