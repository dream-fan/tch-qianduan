var gulp = require("gulp"),
	del = require("del"),
	less = require("gulp-less"),
	concat = require("gulp-concat"),
	imagemin = require("gulp-imagemin"),
	livereload = require("gulp-livereload"),
	minicss = require("gulp-minify-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify");


//html
gulp.task("html",function  () {
	gulp.src("app/html/**/*.html")
	.pipe(gulp.dest("dist/html"))
})


//css
gulp.task("less",function  () {
	gulp.src("app/less/**/*.less")
	.pipe(less())
	.pipe(minicss())
	.pipe(gulp.dest("dist/css"))
})

//js
gulp.task("script",function  () {
	gulp.src("app/js/**/*.js")
	.pipe(uglify())
	.pipe(gulp.dest("dist/js"))
})

//image
gulp.task("image",function  () {
	gulp.src("app/images/*")
	.pipe(imagemin())
	.pipe(gulp.dest("dist/images"))
})


//del
gulp.task("del",function  () {
	del("dist")
})




gulp.task("default",["del"],function  () {
	setTimeout(function  () {
		gulp.start("html","less","script","image")
	},200)
})



// 监视
gulp.task('watch', function() {
  // 监视css文件的改动
  gulp.watch('app/less/**/*.less', ['less']);
  // 监视js文件的改动
  gulp.watch('app/js/*.js', ['script']);
  // 监视images文件的改动
  gulp.watch('app/images/*', ['image']);
  //监听html的改动
  gulp.watch('app/html/*', ['html']);
  // 创建浏览器自动刷新服务器
  livereload.listen();
  // dist目录下文件有改动就会浏览器刷新
  gulp.watch(['dist/**/*.*']).on('change', livereload.changed);
});



