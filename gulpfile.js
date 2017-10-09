var gulp = require('gulp');
const jshint = require('gulp-jshint');
var less = require('gulp-less');
var path = require('path');
const babel = require('gulp-babel');
var copy = require('copy');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
const del = require('del');
var browserSync = require('browser-sync').create();

gulp.task('default',function () {
  //this is default task
});

//added gulp-jshint task
gulp.task('jshint', function() {
  return gulp.src('project/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//added gulp-less task
gulp.task('less', function () {
  return gulp.src('project/less/*.less')
    .pipe(less({
      paths: [ path.join('project/less') ]
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

//added js task which transpile es6 code to es5 with babel
gulp.task('js', function () {
    return gulp.src('project/js/new.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dest/js'));
});

//added js task which copy js/new.js to dest/copy
gulp.task('copy', function (cb) {
  copy('project/js/new.js', 'dest/copy', cb);
});

//added js task which concat one.js and two.js
gulp.task('concat', function() {
  return gulp.src(['project/js/one.js', 'project/js/two.js'])
    .pipe(concat('onetwo.js'))
    .pipe(gulp.dest('dest/concat'));
});

//added js task which uglify app.js
gulp.task('uglify', function (cb) {
  pump([
        gulp.src('project/js/app.js'),
        uglify(),
        gulp.dest('dest/uglify')
    ],
    cb
  );
});

//deleted todelete.js from js folder
gulp.task('del', function () {
	del('project/js/todelete.js').then(paths => {
    	console.log('Deleted this file:\n', paths.join('\n'));
	});
});

//task livereload (use browser-sync)
gulp.task('livereload', function () {
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("project/index.html").on('change', browserSync.reload);
    gulp.watch("dest/css/*.css").on('change', browserSync.reload);
    gulp.watch("project/js/app.js").on('change', browserSync.reload);
});

//-------------------------------------------------------------
// task server
gulp.task('server', function () {
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
	gulp.watch('project/less/*.less',['less']);
    gulp.watch("project/*.html").on('change', browserSync.reload);
    gulp.watch("project/js/app.js").on('change', browserSync.reload);
});

//-------------------------------------------------------------
// task prod
// gulp.task('prod', function () {
	
// });


