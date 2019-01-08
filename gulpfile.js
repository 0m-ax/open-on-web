const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const gulp = require('gulp')
const rollup = require('rollup')
const uuid = require('uuid/v4')
const sass = require('gulp-sass')
const cleanCss = require('gulp-clean-css')
const fileList = require('gulp-filelist')
const {terser} = require('rollup-plugin-terser')
let BUILDID = uuid();
gulp.task('js', async function () {
    const bundle = await rollup.rollup({
      input: ['./src/index.js','./src/main.js','./src/share.js','./src/service-worker.js'],
      plugins: [
        commonjs(),
        resolve({
            preferBuiltins: false
        }),
        terser({
            sourcemap:true
        }),
        replace({
            'BUILD_ID':BUILDID
        })
      ],
      treeshake:false,
      experimentalOptimizeChunks:true
    });
    await bundle.write({
      dir: './dist',
      format: 'es',
      sourcemap: false
    });
  });

  gulp.task('css', function () {
    return gulp.src('./src/css/*.scss')
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/css'))
  })
  gulp.task('html', function () {
    return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist/'))
  })
  gulp.task('img', function () {
    return gulp.src('./src/img/*.*')
    .pipe(gulp.dest('./dist/img'))
  })
  gulp.task('manifest', function () {
    return gulp.src('./src/manifest.json')
    .pipe(gulp.dest('./dist'))
  })
  gulp.task('cache', function () {
    return gulp.src(['dist/**/*','!dist/cache.json','!dist/service-worker.js'])
    .pipe(fileList('cache.json',{ relative: true }))
    .pipe(gulp.dest('./dist'))
  })
  gulp.task('bundle',gulp.series([gulp.parallel(['html','css','js','img','manifest']),'cache']))
