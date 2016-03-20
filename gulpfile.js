var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var del = require('del');
var gulp = require('gulp');
var ignore = require('gulp-ignore');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');


//Port 

var ENV = {
    'DEV': {
        'PORT': 5000
    },
}

// Paths
var paths = {
    'src': {
        'images': './src/img/',
        'root': './src/',
        'scripts': './src/js/',
        'styles': './src/sass/',
        'fonts': './src/fonts/',
    },
    'dist': {
        'images': './dist/img/',
        'root': './dist/',
        'scripts': './dist/js/',
        'styles': './dist/css/',
        'fonts': './dist/fonts/'
    },
};

/**
 * Clean
 *
 * Cleans the dist directory
 */
gulp.task('clean', function () {
    'use strict';

    return del([paths.dist.root + '**/*']);
});

/**
 * Copy
 *
 * Copies all static files to the dist
 */
gulp.task('copy', function () {
    'use strict';

    return gulp.src([
            paths.src.root + '**/*.html',
            paths.src.images + '**/*',
            paths.src.fonts + '**/*'
        ], {
            'base': paths.src.root
        })
        .pipe(gulp.dest(paths.dist.root));
});

/**
 * Styles
 *
 * Compiles SASS to CSS
 * Writes Sourcemaps
 * Autoprefixes
 * Live-reloads browser
 */
gulp.task('styles', function () {
    'use strict';

    return gulp.src(paths.src.styles + 'main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            'outputStyle': 'expanded',
            'precision': 14
        }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(ignore.exclude('*.map'))
        .pipe(browserSync.reload({
            'stream': true
        }));
});

/**
 * Bundle Scripts
 *
 * Bundles JS
 * Writes sourcemaps
 */
gulp.task('bundleScripts', function () {
    'use strict';

    return browserify({
            'entries': [paths.src.scripts + 'main.js'],
            'debug': true
        })
        .transform(babelify, {
            'presets': ['es2015']
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            'loadMaps': true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist.scripts));
});

/**
 * Scripts
 *
 * Runs bundleScripts
 */
gulp.task('scripts', gulp.task('bundleScripts'));

/**
 * Server
 *
 * Runs a server, serving up the contents in paths.dist.root on port 1337
 */
gulp.task('server', function () {
    'use strict';
    browserSync({
        // reloadOnRestart: true,
        'server': {
            'baseDir': [paths.dist.root],
            'directory': true
        },
        'port': ENV.DEV.PORT,
    });
});

/**
 * Watch
 *
 * Watches files and runs the correct tasks
 */
gulp.task('watch', function () {
    'use strict';

    gulp.watch([paths.src.root + '**/*.html', paths.src.images + '**/*', paths.src.fonts + '**/*'], gulp.series('copy', browserSync.reload));
    gulp.watch([paths.src.styles + '**/*.scss'], gulp.task('styles'));
    gulp.watch([paths.src.scripts + '**/*.js'], gulp.series('scripts', browserSync.reload));
});

// Default Task
gulp.task('default',
    gulp.series('clean', 'copy',
        gulp.parallel('scripts', 'styles'),
        gulp.parallel('server', 'watch')
    )
);

// Build tasks
gulp.task('build',
    gulp.series('clean', 'copy',
        gulp.parallel('scripts', 'styles')
    )
);