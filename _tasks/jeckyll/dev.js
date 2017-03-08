/*
	JEKYLL DEV
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {




		// Return module
		return function() {


			const child = require('child_process');
const gutil = require('gulp-util');


  const jekyll = child.spawn('jekyll', ['serve',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);



	};
