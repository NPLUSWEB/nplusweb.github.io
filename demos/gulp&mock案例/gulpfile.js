'use strict';
var gulp = require('gulp'),
    connect = require('gulp-connect'), // 静态web服务器
    fileinclude = require('gulp-file-include'), // 合并html文件
    sass = require('gulp-sass'), // 将sass代码转为css
    babel = require('gulp-babel'), // 将ES6代码转为ES5
    rename = require('gulp-rename'), // 重命名文件
    uglify = require('gulp-uglify'), // 压缩js文件
    cssnano = require('gulp-cssnano'), // 压缩css文件
    htmlmin = require('gulp-htmlmin'), // 压缩html
    imagemin = require('gulp-imagemin'), // 压缩图片
    cache = require('gulp-cache'), // 图片缓存，只有图片替换了才压缩
    pngquant = require('imagemin-pngquant'); // 深度压缩png图片插件

// html合并压缩
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('./app/pages/*.html')
    .pipe(fileinclude())
    .pipe(htmlmin(options))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

// scss转css并压缩重命名
gulp.task('convertCSS', function(){
    return gulp.src('./app/css/main.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename(function(path){
        path.basename += '.min';
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

// js es6转es5并压缩重命名
gulp.task('convertJS', function () {
    return gulp.src('./app/js/main.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(rename(function(path){
        path.basename += '.min';
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});

// 图片压缩
gulp.task('convertIMG', function () {
    /*var options = {
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    };*/
    var options = {
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
        use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
    };
    return gulp.src('./app/img/*.{png,jpg,gif,ico}')
    .pipe(cache(imagemin(options)))
    .pipe(gulp.dest('./dist/img'));
});

// 配置服务器
gulp.task('connect', function () {
    connect.server({
        livereload: true,
        root: './',
        port:8082
    });
});

// 监听文件变化
gulp.task('watch', function () {
    gulp.watch('./app/pages/**/*.html', ['html']);
    gulp.watch('../app/css/main.scss', ['convertCSS']);
    gulp.watch('./app/js/main.js', ['convertJS']);
    gulp.watch('./app/img/*.{png,jpg,gif,ico}', ['convertIMG']);
});

// 配置gulp启动任务
gulp.task('default', ['html','convertCSS','convertJS','convertIMG','watch','connect']);

// 清除缓存
gulp.task('clear', function () {
    cache.clearAll();
});