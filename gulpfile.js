var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function() {
    return gulp.src("src/**.ts")
      .pipe(ts({
        lib:["es6"],
        target:"es6",
        sourceMap:false,
        noEmitOnError:true
      }))
      .pipe(gulp.dest("app"))
});