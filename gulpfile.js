var gulp = require('gulp');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');
var eventStream = require('event-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

require('gulp-release-tasks')(gulp);

var env = process.env.NODE_ENV || 'development';
var app = process.env.NODE_NAME || require('./package.json').name;

var dist = 'public';
var modules = 'modules';
var components = 'node_modules';

function handleError(err) {
	console.warn(err.message);
	this.emit('end');
}

var paths = {
	js: [
		'server.js',
		modules + '/**/*.js',
		modules + '/**/*.jsx'
	],
	jsx: [
		modules + '/**/*.jsx'
	],
	react: [
		modules + '/components/app.react.jsx'
	],
	css: [
	],
	scss: {
		utils: [
			modules + '/**/*.scss'
		],
		src: [
			modules + '/components/app.scss'
		]
	},
	images: [
		modules + '/**/*.{png,jpg,svg,gif,mp4}'
	],
	fonts: [
		modules + '/**/*.{eot,svg,otf,ttf,woff,woff2}'
	],
	misc: [
		{
			src: [
				components + '/font-awesome/fonts/fontawesome-webfont.*'
			],
			dest: dist + '/fonts/'
		},
		{
			src: [
				components + '/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.*'
			],
			dest: dist + '/fonts/bootstrap/'
		},
		{
			src: modules + '/img/favicon.ico',
			dest: dist + '/'
		}
	]
};

gulp.task('clean', function () {
	return del([
		dist
	]);
});

gulp.task('styles', [], function () {
	return gulp.src(paths.scss.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(dist + '/css'));
});

gulp.task('images', [], function () {
	return gulp.src(paths.images)
		.pipe(gulpif(env !== 'development', imagemin()))
		.pipe(gulp.dest(dist + '/'));
});

gulp.task('fonts', [], function () {
	return gulp.src(paths.fonts)
		.pipe(gulp.dest(dist + '/fonts'));
});

gulp.task('misc', [], function () {
	return eventStream.merge.apply(null, paths.misc.map(function (item) {
		return gulp.src(item.src)
			.pipe(gulp.dest(item.dest));
	}));
});

gulp.task('lint', function () {
	return gulp.src(paths.js)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('git-check', [ 'lint' ]);

gulp.task('start', function () {
	nodemon({ script: 'server.js', ext: 'js jsx jade', env: { 'DEBUG': app + ':*' }, watch: [ 'modules/*', 'views/*', 'conf/*', 'server.js' ] });
});

gulp.task('react', function () {
	return browserify({ entries: paths.react, extensions: [ '.jsx' ], debug: env === 'development' })
		.on('error', handleError)
		.transform(babelify)
		.on('error', handleError)
		.bundle()
		.on('error', handleError)
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulpif(env !== 'development', uglify()))
		.on('error', handleError)
		.pipe(gulp.dest(dist + '/js'));
});

gulp.task('watch', [], function () {
	[
		gulp.watch(paths.jsx, [ 'lint', 'react' ]),
		gulp.watch([ paths.scss.src, paths.scss.utils ], [ 'styles' ]),
		gulp.watch(paths.images, [ 'images' ]),
		gulp.watch(paths.files, [ 'files' ]),
		gulp.watch(paths.fonts, [ 'fonts' ]),
		gulp.watch(paths.misc.map(function (item) { return item.src; }), [ 'misc' ])
	].forEach(function (watch) {
		watch.on('change', function (event) {
			console.log('File %s was %s, running tasks...', event.path, event.type);
		});
	});
});

gulp.task('default', [
	'styles',
	'react',
	'images',
	'misc'
]);
