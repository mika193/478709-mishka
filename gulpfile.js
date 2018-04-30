'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var run = require('run-sequence');
var del = require('del');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var jpegoptim = require('imagemin-jpegoptim');
var webp = require('imagemin-webp');
var svgstore = require('gulp-svgstore');

gulp.task('clean:build', function () {
  return del('build');
});

gulp.task('clean:svg', function () {
  return del('build/img/svg');
});

gulp.task('copy:build', function () {
  console.log('Копирование файлов...');

  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/*.html'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('images', function () {
  console.log('Оптимизация изображений...');

  return gulp.src('source/img/**/*.{jpg,png,svg}')
  .pipe(imagemin([
    imagemin.optipng(),
    imagemin.svgo({
      plugins: [
        {removeViewBox: false},
        {removeTitle: true},
        {cleanupNumericValues:
          {floatPrecision: 0}
        }
      ]
    }),
    jpegoptim({
      max: 80,
      progressive: true
    })
  ]))
  .pipe(gulp.dest('build/img'));
});

gulp.task('webp', function () {
  console.log('Конвертирование изображений в формат WebP...');

  return gulp.src('source/img/content/**//**.jpg')
  .pipe(imagemin([
    webp({quality: 80})
  ]))
  .pipe(rename({extname: '.webp'}))
  .pipe(gulp.dest('build/img/content'));
});

gulp.task('sprite', function () {
  console.log('Сборка SVG спрайта...');

  return gulp.src('build/img/svg/*.svg')
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename('pictures.svg'))
  .pipe(gulp.dest('build/img'));
});

gulp.task('style', function() {
  console.log('Сборка и минификация стилевого файла...');

  gulp.src('source/less/style.less')
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest('build/css'))
  .pipe(csso({comments: false}))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream());
});

gulp.task('js', function () {
  console.log('Сборка и минификация скриптов...')

  return gulp.src([
    'node_modules/picturefill/dist/picturefill.js',
    'node_modules/svg4everybody/dist/svg4everybody.js',
    'source/js/**/*.js'
  ])
  .pipe(concat('script.js'))
  .pipe(gulp.dest('build/js'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js'))
  .pipe(server.stream());
});

gulp.task('serve', ['style'], function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('build/less/**/*.less', ['style']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('build/*.html').on('change', server.reload);
});

gulp.task('build', function (callback) {
  run( 'clean:build', 'copy:build', 'style', 'js', 'images', 'webp', 'sprite', 'clean:svg', callback);
});
