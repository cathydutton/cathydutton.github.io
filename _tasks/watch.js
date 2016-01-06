/*
	Watch
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function() {

			// Source paths
			var pathCSS = plugins.path.join(paths.assets.css, '{,**/}*.scss'),
				pathJS = plugins.path.join(paths.assets.js, '{,**/}*.js'),
				//	pathHTML = plugins.path.join(paths.build, '{,**/}*.html'),
				pathImages = plugins.path.join(paths.assets.images, '**');


			// Watch for CSS changes
			plugins.watch(pathCSS, function() {
				gulp.start('scss-lint', 'critical-css', 'main-css');
			});

			// Watch for JS changes
			plugins.watch(pathJS, function() {
				gulp.start('scripts');
			});

			// Watch for HTML changes
			// plugins.watch([pathHTML], function() {
			// 	gulp.start('html');
			// });

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
