// Karma configuration
// Generated on Fri Dec 05 2014 16:49:29 GMT-0500 (EST)

module.exports = function(config) {
  var configuration = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'jasmine'],

    jspm: {
      serveFiles: ['src/**/*.js'],
      loadFiles: ['test/unit/**/*.js']
    },

    proxies: {
      '/src/': '/base/src/',
      '/test/': '/base/test/',
      '/jspm_packages/': '/base/jspm_packages/'
    },

    // list of files / patterns to load in the browser
    files: [
      'http://code.jquery.com/jquery-1.9.1.min.js',
      'sample/kendo-sdk/js/kendo.all.min.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js': ['babel'],
      'src/**/*.js': ['babel']
    },
    'babelPreprocessor': {
      options: {
        sourceMap: 'inline',
        moduleIds: false,
        optional: [
          'es7.decorators',
          'es7.classProperties'
        ]
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
