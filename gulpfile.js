/*
	Dependencies
	----------------------------------- */

	// Gulp + plugins
	var gulp = require('gulp'),
		plugins = require('gulp-load-plugins')();

	// Non-gulp modules
	plugins.path = require('path');
	plugins.browserSync = require('browser-sync'),
	plugins.runSequence = require('run-sequence');
	plugins.eventStream = require('event-stream');

	// Shared paths
	var paths = {

		// Build paths
		base: __dirname,
		dist: plugins.path.join(__dirname, '_site'),
		source: plugins.path.join(__dirname, ''),
		tasks: plugins.path.join(__dirname, '_tasks'),

		// Src assets
		src: {
			scss: plugins.path.join(__dirname, '_assets/scss'),
			js: plugins.path.join(__dirname, '_assets/js'),
			images: plugins.path.join(__dirname, '_assets/img')
		},

		// Build assets
		build: {
			css: plugins.path.join(__dirname, 'assets/css'),
			js: plugins.path.join(__dirname, 'assets/js'),
			images: plugins.path.join(__dirname, 'assets/img')
		},

		// Node modules
		modules: plugins.path.join(__dirname, 'node_modules')
	};


/*
	Child tasks
	----------------------------------- */

	plugins.getModule = function(task) {
		return require(plugins.path.join(paths.tasks, task))(paths, gulp, plugins);
	}

	gulp.task('critical-css', plugins.getModule('css/critical'));
	gulp.task('main-css', plugins.getModule('css/main'));
	gulp.task('scripts', plugins.getModule('javascript/scripts'));
	gulp.task('inject', plugins.getModule('html/inject'));
	gulp.task('image-optimise', plugins.getModule('images/optimise'));
	gulp.task('watch', plugins.getModule('watch'));
	gulp.task('browser-sync', plugins.getModule('browser-sync'));


/*
	Utility tasks
	----------------------------------- */

	// Clean Task
	var clean = require('gulp-clean');

	gulp.task('clean', function() {
		return gulp.src(plugins.path.join(paths.dist))
	    .pipe(clean());
	});


	// Sass Lint
  var scsslint = require('gulp-scss-lint'),
  plumber = require('gulp-plumber');

  gulp.task('scss-lint', function() {
		return gulp.src(plugins.path.join(paths.src.scss, '*.scss'))
    .pipe(plumber())
    .pipe(scsslint({
      'config': 'default.yml',
      'reporterOutput': 'scssReport.json',
    }))
    //.pipe(scsslint.failReporter()) // Fail on warnings & errors
    .pipe(scsslint.failReporter('E')) // Fail on set errors
    // .on('error', function (err) {
    //       console.log(err);
    //       process.exit(1);
    // })
  });


	// CSS Lint
	var csslint = require('gulp-csslint')

  gulp.task('css-lint', function() {
    return gulp.src(plugins.path.join(paths.build.css, '*.css'))
      .pipe(csslint({
        'config': '.csslintrc',
        'shorthand': false
      }))
      .pipe(csslint.reporter());
  });

	// Style stats
	var stylestats = require('gulp-stylestats');

	gulp.task('stylestats', function () {
	  return gulp.src(plugins.path.join(paths.build.css, '*.css'))
	    .pipe(stylestats({
	      type: 'json',
	      outfile: true
	    }))
	    .pipe(gulp.dest('./stats/'));
	});

	// Jekyll Dev
	// gulp.task('jekyll-dev', function() {
	//
	// 	// Child modules
	// 	var spawn = require('child_process').spawn;
	// 	var jekyll = spawn('jekyll', ['build', '--config', '_config.yml', '_config_dev.yml', '--trace'], {stdio: 'inherit'});
	//
	// 	// Return module
	// 	return function() {
	// 		jekyll.on('exit', function(code) {
	// 			gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
	// 		})
	// 		.pipe(plugins.browserSync.reload({ stream: true }));
	// 	};
	// });

	// Jekyll Live
	// gulp.task('jekyll-live', function() {
	//
	// 	// Child modules
	// 	var spawn = require('child_process').spawn;
	// 	var jekyll = spawn('jekyll', ['build', '--config', '_config.yml', '--trace'], {stdio: 'inherit'});
	//
	// 	// Return module
	// 	return function() {
	// 		jekyll.on('exit', function(code) {
	// 			gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
	// 		})
	// 		.pipe(plugins.browserSync.reload({ stream: true }));
	// 	};
	// });

	// Jekyll Rebuild
	// gulp.task('jekyll-rebuild', function() {
	// 	plugins.runSequence('default');
	// });


	const child = require('child_process');
	const gutil = require('gulp-util');

	gulp.task('jekyll-dev', () => {
	  const jekyll = child.spawn('jekyll', ['serve',
	    '--watch',
	    '--incremental'
	    // '--drafts'
	  ]);

	  const jekyllLogger = (buffer) => {
	    buffer.toString()
	      .split(/\n/)
	      .forEach((message) => gutil.log('Jekyll: ' + message));
	  };

	  jekyll.stdout.on('data', jekyllLogger);
	  jekyll.stderr.on('data', jekyllLogger);
	});


	// gulp.task('jekyll-live', () => {
	// 	const jekyll = child.spawn('jekyll', ['serve',
	// 		'--watch',
	// 		'--incremental'
	// 	]);
	//
	// 	const jekyllLogger = (buffer) => {
	// 		buffer.toString()
	// 			.split(/\n/)
	// 			.forEach((message) => gutil.log('Jekyll: ' + message));
	// 	};
	//
	// 	jekyll.stdout.on('data', jekyllLogger);
	// 	jekyll.stderr.on('data', jekyllLogger);
	// });


	const browserSync = require('browser-sync').create();
	const siteRoot = '_site';

	gulp.task('serve', () => {
	  browserSync.init({
	    files: [siteRoot + '/**'],
	    port: 4000,
	    server: {
	      baseDir: siteRoot
	    }
	  });
	});


	// Deploy
	var ghPages = require('gulp-gh-pages');

	gulp.task('deploy', function() {
	  return gulp.src('./_site/**/*')
	    .pipe(ghPages());
	});


/*
	Main tasks
	----------------------------------- */

	// Shared build tasks
	gulp.task('build', function(callback) {
		//plugins.runSequence('scss-lint', ['critical-css', 'main-css', 'scripts'], callback);
		plugins.runSequence(['critical-css', 'main-css', 'scripts', 'image-optimise'], callback);
	});

	// Shared live tasks
	// gulp.task('build-live', function(callback) {
	// 	plugins.runSequence('scss-lint', ['critical-css', 'main-css', 'scripts'], callback);
	// });

	// Default tasks
	gulp.task('default', function(callback) {
		plugins.runSequence('build', callback);
	});

	// Development tasks
	gulp.task('dev', function(callback) {
		plugins.runSequence('build', ['watch', 'jekyll-dev',  'inject', 'serve'],  callback);
	});


	// Live tasks
	gulp.task('live', function(callback) {
		plugins.runSequence('deploy', callback);
	});
