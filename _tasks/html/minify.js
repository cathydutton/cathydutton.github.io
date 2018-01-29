/*
	HTML INJECT
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {




		// Child modules
		var htmlmin = require('gulp-html-minifier')


		// Return module
		return function() {

		  return gulp.src('docs/**/**.html')


			.pipe(htmlmin({collapseWhitespace: true}))
			.pipe(gulp.dest(plugins.path.join(paths.dist)))
			.pipe(plugins.browserSync.reload({ stream: true }));
		};
	};
