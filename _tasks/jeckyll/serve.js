/*
	JEKYLL SERVE
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

;

		// Return module
		return function() {


			const browserSync = require('browser-sync').create();
			const siteRoot = '_site';


			  browserSync.init({
			    files: [siteRoot + '/**'],
			    port: 4000,
			    server: {
			      baseDir: siteRoot
			    }
			  });







	};
