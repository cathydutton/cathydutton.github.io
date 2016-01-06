/*
	CSS
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules
		var rename = require('gulp-rename'),
			minifycss = require('gulp-minify-css'),
			postcss = require('gulp-postcss'),
			autoprefixer = require('autoprefixer-core'),
			mqpacker = require('css-mqpacker'),
			csswring = require('csswring'),
			plumber = require('gulp-plumber');

				// Process Sass
				return function() {

					var processors = [
						autoprefixer({
							browsers: ['> 2%', 'IE >= 8', 'iOS >= 7'],
							cascade: false,
							map: true,
							remove: true
						}),
						mqpacker,
						csswring ({
							removeAllComments: true
						}),
					];

					return gulp.src('assets/scss/critical.scss')
					//return gulp.src(plugins.path.join(paths.assets.css, '/critical.scss'))
					.pipe(plumber())
					.pipe(plugins.sass({ style: 'expanded', }))
					.pipe(gulp.dest('dist/assets/css'))
					.pipe(postcss(processors))
					.pipe(rename({ suffix: '.min' }))
					.pipe(minifycss())
					.pipe(gulp.dest('dist/assets/css'))
					//.pipe(gulp.dest(plugins.path.join(paths.build, '/assets/css'))
					.pipe(plugins.filter('**/*.css'))
					.pipe(plugins.browserSync.reload({ stream: true }));
				};

	};
