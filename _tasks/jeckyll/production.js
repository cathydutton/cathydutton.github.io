/*
	JEKYLL PRODUCTION
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {




		// Return module
		return function() {




				var liveEnv = process.env;
				liveEnv.JEKYLL_ENV = 'live';
			  const jekyll = child.spawn('jekyll', ['serve',
			    // '--watch',
			    // '--incremental'
			    // '--drafts'
			  ]);

			  const jekyllLogger = (buffer) => {
			    buffer.toString()
			      .split(/\n/)
			      .forEach((message) => gutil.log('Jekyll: ' + message));
			  };

			  jekyll.stdout.on('data', jekyllLogger);
			  jekyll.stderr.on('data', jekyllLogger);
		





	};
