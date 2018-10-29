var gulp = require('gulp');

var browserSync = require('browser-sync').create();

var less = require('gulp-less');

var plumber = require('gulp-plumber');

var notify = require('gulp-notify');

var sourcemaps = require('gulp-sourcemaps');

var autoprefixer = require('gulp-autoprefixer');

var watch = require('gulp-watch');

gulp.task('server', ['styles'], function(){
// подключаем локальный сервер
    browserSync.init({
        server: { baseDir: './app'}
    });
// следим за изменением файлов html и автоматом обновляем страницу
    watch('./app/**/*.html').on('change', browserSync.reload);
// следим за всеми файлами js и обновляем страницу
    watch('./app/**/*.js').on('change', browserSync.reload);
// отслеживаем все less файлы и обновляем страницу
    watch('./app/less/**/*.less', function(){
        gulp.start('styles');
    });
});
// создаём компиляцию less в css
gulp.task('styles', function(){
    return gulp.src('./app/less/main.less')
        .pipe(plumber({
            // запускаем обработчик и вывод ошибок
            errorHandler: notify.onError(function(err){
                return {
                    title: 'Styles',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());
        


});
// gulp запуск по дефолту
gulp.task('default', ['server']);