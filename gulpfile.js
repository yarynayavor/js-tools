var gulp = require('gulp');
const jshint = require('gulp-jshint');
var less = require('gulp-less');
var path = require('path');
const babel = require('gulp-babel');
var copy = require('copy');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var del = require('delete');
var browserSync = require('browser-sync').create();
var gulpSequence = require('gulp-sequence');

//added gulp-jshint task
gulp.task('jshint', function() {
  return gulp.src('project/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//added gulp-less task (compiled css file to ‘prod/css/styles.css’)
gulp.task('less', function () {
  return gulp.src('project/less/*.less')
    .pipe(less({
      paths: [ path.join('less') ]
    }))
    .pipe(gulp.dest('prod/css'))
    .pipe(browserSync.stream())
});

//added js task which transpile es6 code to es5 with babel
gulp.task('js', function () {
    return gulp.src('project/js/es/new.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('prod/js'));
});

//added js task which concat all js projects and libs
gulp.task('concat', function() {
  return gulp.src(['project/js/*.js','project/js/libs/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('project/js'));
});

//added js task which minify all js code (including libs) to 1 file ‘prod/js/app.js’
gulp.task('uglify',['concat'], function (cb) {
  pump([
        gulp.src('project/js/app.js'),
        uglify(),
        gulp.dest('prod/js')
    ],
    cb
  );
});

//delete prod folder if excist 
gulp.task('del', function () {
	del.sync(['prod']);
});

//added js task which copy project/index.html to prod
gulp.task('copy',['del'],function () {
	return gulp.src('project/index.html')
		.pipe(gulp.dest('prod'));
});

// task livereload(use browser-sync)
gulp.task('livereload', function () {
	browserSync.init({
        server: {
            baseDir: 'prod'
        }
    });
	gulp.watch('project/less/*.less',['less']);
    gulp.watch("prod/*.html").on('change', browserSync.reload);
    gulp.watch("prod/js/*.js").on('change', browserSync.reload);
});

// task server which run watches for js,less,html and livereload
gulp.task('server', gulpSequence('copy','js','less','livereload'));

//task prod
gulp.task('prod', gulpSequence('copy','less','uglify'));

//task default whick run task server
gulp.task('default',['server']);