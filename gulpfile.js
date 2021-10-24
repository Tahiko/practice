const {src,dest,series,watch} = require('gulp')
const csso = require ('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
// const imagemin = require('gulp-imagemin')
const image = require('gulp-image');


function html() {
    return src('src/**.html')
    .pipe(include({
        prefix: '@@'
    }))
    .pipe(htmlmin({
        collapseInlineTagWhitespace:true
    }))
    .pipe(dest('dist'));
}

function scss() {
    return src('src/scss/**.scss')

    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist'));
}

function clear() {
    return del('dist')
}

function fotochka() {
    return src('img/*')
        .pipe(image())
        .pipe(dest('dist/images'))
}


function serve() {
    sync.init({
        server: './dist'
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
    watch('img/*',series(fotochka)).on('change',sync.reload)
}

exports.build = series(clear,scss,html,fotochka)
exports.serve = series(clear,scss,html,fotochka,serve)
exports.clear = clear
exports.html = html
exports.scss = scss




