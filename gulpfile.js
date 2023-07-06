const gulp = import('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano =  require('gulp-cssnano')
const rev = require('gulp-rev')
const {task, dest, src, series} = require('gulp')

const uglify = import('gulp-uglify-es').default;
const imagemin = import('gulp-imagemin');
const del = import('del')

task('css',function(done){
    console.log('minifing css...');
    src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(dest('./assets.css'))
    src('./assets/**/*.css')

    .pipe(rev())
    .pipe(dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(dest('./public/assets'));
    done();
})

task('js', function(done){
    console.log('minifying js...');
    src('./assets/**/*.js')
    // .pipe(uglify())
    .pipe(rev())
    .pipe(dest('./public/assets'))
    .pipe(rev.manifest({       //it stores the file like packege.json which have old files name as object and rename file name as key
        cwd: 'public',         //its map these file basically
        merge: true
    }))
    .pipe(dest('./public/assets'));
    done()
});

task('images', function(done){
    console.log('compressing images...');
    src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    // .pipe(imagemin())
    .pipe(rev())
    .pipe(dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(dest('./public/assets'));
    done();
});

// empty the public/assets directory
task('clean:assets', async(done)=>{
    (await del).sync(['./public/assets']);
    done();
});

task('build', series('clean:assets','css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});