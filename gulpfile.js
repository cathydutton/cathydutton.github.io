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
		assets: plugins.path.join(__dirname, 'assets'),
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
	gulp.task('dev-css', plugins.getModule('css/dev'));
	gulp.task('inject', plugins.getModule('html/inject'));
	gulp.task('minify', plugins.getModule('html/minify'));
	gulp.task('image-optimise', plugins.getModule('images/optimise'));
	gulp.task('watch', plugins.getModule('watch'));
	gulp.task('browser-sync', plugins.getModule('browser-sync'));


/*
	Utility tasks
	----------------------------------- */

	// Clean _site
	var clean = require('gulp-clean');

	gulp.task('clean', function() {
		return gulp.src(plugins.path.join(paths.dist))
	    .pipe(clean());
	});

	// Clean assets
	gulp.task('clean-assests', function () {
	return gulp.src(plugins.path.join(paths.assets))
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
  //  .pipe(scsslint.failReporter()) // Fail on warnings & errors
    .pipe(scsslint.failReporter('E')) // Fail on set errors
    .on('error', function (err) {
          console.log(err);
          process.exit(1);
    })
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



	// JEKYLL DEV
	const child = require('child_process');
	const gutil = require('gulp-util');

	gulp.task('jekyll-dev', () => {
		var devEnv = process.env;
		devEnv.JEKYLL_ENV = 'development';
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
	});


	// JEKYLL LIVE
	gulp.task('jekyll-live', () => {
		var liveEnv = process.env;
		liveEnv.JEKYLL_ENV = 'live';
	  //return child.spawn('jekyll', ['build'], { stdio: 'inherit' }) // Adding incremental reduces build time.
	  const jekyll = child.spawn('jekyll', ['serve',
	    '--incremental'
	  ]);
		const jekyllLogger = (buffer) => {
	    buffer.toString()
	      .split(/\n/)
	      .forEach((message) => gutil.log('Jekyll: ' + message));
	  };

	  jekyll.stdout.on('data', jekyllLogger);
	  jekyll.stderr.on('data', jekyllLogger);
	});



	// JEKYL SERVE
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
	// var ghPages = require('gulp-gh-pages');
	// gulp.task('deploy', function() {
	// 	return gulp.src('./_site/**/*')
	// 		.pipe(ghPages());
	// });


	var deploy = require('gulp-deploy-git');
	gulp.task('deploy', function() {
		return gulp.src('_site/**/*', { read: false })
			.pipe(deploy({
				repository: 'https://github.com/cathydutton/my-site.git',
				branches:   ['gh-pages']
			}));
	});

/*
	Main tasks
	----------------------------------- */

	//  build dev
	gulp.task('build-dev', function(callback) {
		plugins.runSequence('clean-assests', 'clean', 'scss-lint', 'dev-css', 'image-optimise', callback);
	});

	//  build live
	gulp.task('live', function(callback) {
		plugins.runSequence('clean-assests','clean', ['critical-css', 'main-css', 'image-optimise'],  'jekyll-live', callback);
	});

	// Development tasks
	gulp.task('dev', function(callback) {
		plugins.runSequence('build-dev', ['watch', 'jekyll-dev'],  callback);
	});

	// Live tasks
	gulp.task('inject-live', function(callback) {
		plugins.runSequence(['inject'], ['minify'] ,callback);
	});

	// git add _site && git commit -m "Initial dist subtree commit"
	// git subtree push --prefix _site origin gh-pages

	// Push
	gulp.task('push', function(callback) {
		plugins.runSequence('deploy' ,callback);
	});
