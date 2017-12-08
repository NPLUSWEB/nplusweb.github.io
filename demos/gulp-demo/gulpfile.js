var gulp = require('gulp'),
    runSequence = require('run-sequence'), // 控制多个任务进行顺序执行或者并行执行
    rev = require('gulp-rev'), // 根据静态资源内容，生成md5签名，打包出来的文件名会加上md5签名，同时生成一个json用来保存文件名路径对应关系
    revCollector = require('gulp-rev-collector'), // 从manifests中获取静态资源版本数据, 该数据由不同的流产生, 并且替换html中的链接
    babel = require('gulp-babel'), // 将ES6代码转为ES5；注意：需要安装 ‘babel-core’ 和 ‘babel-preset-es2015’
    uglify = require('gulp-uglify'), // 压缩js文件
    cssnano = require('gulp-cssnano'), // 压缩css文件
    sourcemaps  = require('gulp-sourcemaps'), //生成sourcemap
    htmlmin = require('gulp-htmlmin'), // 压缩html
    imagemin = require('gulp-imagemin'), // 压缩图片
    cache = require('gulp-cache'), // 图片缓存，只有图片替换了才压缩
    del = require('del'); // 删除文件

// 清除./dist/css文件夹下文件
gulp.task('clean:css', function(){
    return del(['./dist/css/*']);
});
// 清除./dist/js文件夹下文件
gulp.task('clean:js', function(){
    return del([
        './dist/js/*',
        '!./dist/js/{jquery.min,vue.min}.js'
    ]);
});

// 对style.css添加md5签名
gulp.task('revCss',function(){
    return gulp.src('./app/css/style.css')
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(rev())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/css'));
});

// 对{login,messages,public}.js添加md5签名
gulp.task('revJs',function(){
    return gulp.src("./app/js/main.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify(/*{ mangle: { toplevel: true }}*/))
        .pipe(rev())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./dist/js"))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/js'));
});

//Html替换css、js文件版本  
gulp.task('revHtmlCss', function(){
    return gulp.src(['./dist/css/*.json', './app/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./dist'));
});
gulp.task('revHtmlJs', function(){ 
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
    return gulp.src(['./dist/js/*.json', './dist/*.html'])
        .pipe(htmlmin(options))
        .pipe(revCollector())  
        .pipe(gulp.dest('./dist'));
});

// 图片压缩
gulp.task('convertIMG', function(){
    var options = {
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    };
    return gulp.src('./app/img/*.{png,jpg,gif,ico}')
    .pipe(cache(imagemin(options)))
    .pipe(gulp.dest('./dist/img'));
});

//构建  
gulp.task('default', function(done){
    //依次顺序执行
    runSequence(
        ['clean:css'],
        ['clean:js'],
        ['revCss'],
        ['revHtmlCss'],
        ['revJs'],
        ['revHtmlJs'],
        ['convertIMG'],
        done
    );
});