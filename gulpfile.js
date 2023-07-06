const gulp = import('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano =  require('gulp-cssnano')
const rev = require('gulp-rev')
const {task} = require('gulp')
const {src} = require('gulp')
const {dest} = require('gulp')
task('css',function(){
    console.log('minifing css...');
    src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(dest('./assets.css'))

    return src('./assets/**/*.css')
    .pipe(rev())
    .pipe(dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(dest('./public/assets'))
})