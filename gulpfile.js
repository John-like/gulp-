var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// 编译并压缩js
gulp.task('convertJS', function(){
  return gulp.src('app/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
})


// 合并并压缩css
gulp.task('convertCSS', function(){
  return gulp.src('app/css/*.css')
    .pipe(concat('all.css'))
    .pipe(cssnano())
    .pipe(rename(function(path){
      path.basename += '.min';
    }))
    .pipe(gulp.dest('dist/css'));
})

// 监视文件变化，自动执行任务
gulp.task('watch', function(){
  gulp.watch('app/css/*.css', ['convertCSS']);
  gulp.watch('app/js/*.js', ['convertJS', 'browserify']);
})

// browserify
gulp.task("browserify", function () {
    var b = browserify({
        entries: "dist/js/app.js"
    });

    return b.bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist/js"));
});

gulp.task('hello',function(){
	console.log('222222')
})

var problem='aaa'
gulp.task('can',function(){
	console.log(problem)
})

gulp.task('start', ['convertJS', 'convertCSS', 'browserify', 'watch','hello','can']);
//如果我们使用了ES6中的 module，通过 import、export 进行模块化开发，那么通过babe
//l转码后， import 、 export 将被转码成符合CMD规范的 require
//和 exports 等，但是浏览器还是不认识，这时可以使用 bowserify 对代码再次进行构建。产生文件为 bundle.js
