var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});

var mainBowerFiles = require('main-bower-files');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


// Watch scss AND html files, doing different things with each.
gulp.task('serve',function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
    gulp.watch("src/**/*.*.html").on("change", reload);
    gulp.watch("src/**/*.html").on("change", reload);
    gulp.watch("src/**/**.css").on("change", reload);
    gulp.watch("*.js").on("change", reload);
    gulp.watch("src/**/*.js").on("change", reload);
    gulp.watch("src/**/*.*.js").on("change", reload);
   // gulp.watch("src/assets/sass/*.scss",['scss',reload]);
});
