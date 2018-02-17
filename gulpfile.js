const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const del = require('del');

const paths = {
    src: './src/',
    dist: './dist/'
}

gulp.task('clean', () => {
    return del.sync(paths.dist);
})

gulp.task('sass', () => {
    return gulp.src(paths.src + 'styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dist + 'styles'))
        .pipe(browserSync.stream());
});

gulp.task('html', () => {
    return gulp.src(paths.src + '*.html', {base: paths.src})
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream());
})


gulp.task('scripts', () => {
    gulp.src(paths.src + 'scripts/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest(paths.dist + 'scripts'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: paths.dist
        }
    });
});

gulp.task('watchers', () => {
    gulp.watch(paths.src + 'styles/*.scss', ['sass']);
    gulp.watch(paths.src + 'scripts/*.js', ['scripts']);
    gulp.watch(paths.src + '*.html', ['html']);
})

gulp.task('build', ['clean', 'watchers', 'html', 'scripts', 'sass', 'browser-sync']);

gulp.task('default', ['build']);