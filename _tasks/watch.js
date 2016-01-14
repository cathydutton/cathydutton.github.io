/*
	Watch
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Image clean
		var imageclean = require('gulp-clean');

		gulp.task('imageclean', function() {
			return gulp.src(plugins.path.join(paths.build.images, '**.**'))
				.pipe(imageclean());
		});

		// Return module
		return function() {

			// Source paths
			var pathCSS = plugins.path.join(paths.src.scss, '{,**/}*.scss'),
				pathJS = plugins.path.join(paths.src.js, '{,**/}*.js'),
				pathImages = plugins.path.join(paths.src.images, '**');

			// Watch for CSS changes
			plugins.watch(pathCSS, function() {
				plugins.runSequence('scss-lint', 'critical-css', 'main-css');
			});

			// Watch for JS changes
			plugins.watch(pathJS, function() {
				gulp.start('scripts');
			});

			// Watch for JEKYLL changes
			plugins.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_posts/*', '_drafts/*', '_config.yml'], function() {
				gulp.start('jekyll-rebuild');
			});

			// Watch for IMAGE changes
			plugins.watch(pathImages, function() {
				gulp.start('jekyll-rebuild');
			});

		};
	};
