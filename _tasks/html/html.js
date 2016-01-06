/*
	HTML INCLUDES
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules
		var htmlmin = require('gulp-html-minifier'),
				replace = require('gulp-replace'),
				fileinclude = require('gulp-file-include');

		// Return module
		return function() {

		  //return gulp.src('dist/*.html')
			return gulp.src(plugins.path.join(paths.build))

			// File Include
			.pipe(fileinclude({
	      prefix: '@@',
	      basepath: '@file'
	    }))

			@@include('./includes/sidebar.html')
			@@include('./includes/index-header.html', {
					"intro": "Hello",
					"heading": "Welcome to my portfolio &amp; blog."
			})

	};
