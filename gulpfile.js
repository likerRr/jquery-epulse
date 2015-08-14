var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");

gulp.task('default', ['build', 'build-min', 'dev']);

gulp.task('dev', function() {
	return gulp.src('src/*.js')
			.pipe(sourcemaps.init())
			.pipe(uglify())
			.pipe(sourcemaps.write())
			.pipe(rename('dev.jquery-epulse.min.js'))
			.pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
	return gulp.src('src/*.js')
			.pipe(gulp.dest('dist'));
});

gulp.task('build-min', function() {
	return gulp.src('src/*.js')
			.pipe(uglify())
			.pipe(rename('jquery-epulse.min.js'))
			.pipe(gulp.dest('dist'));
});