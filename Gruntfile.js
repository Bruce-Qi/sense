/* jshint node:true */
'use strict';
module.exports = function (grunt) {

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    baseDir: './kibana',
    srcDir: 'kibana/src',
    destDir: 'dist',
    tempDir: 'tmp'
  };

  // load plugins
  require('load-grunt-tasks')(grunt);

  // load task definitions
  grunt.loadTasks('tasks');

  // Utility function to load plugin settings into config
  function loadConfig(config,path) {
    require('glob').sync('*', {cwd: path}).forEach(function(option) {
      var key = option.replace(/\.js$/,'');
      // If key already exists, extend it. It is your responsibility to avoid naming collisions
      config[key] = config[key] || {};
      grunt.util._.extend(config[key], require(path + option)(config));
    });
    // technically not required
    return config;
  }

  // Merge that object with what with whatever we have here
  loadConfig(config,'./tasks/options/');

  if (grunt.file.exists('kibana')) {
    grunt.loadTasks('kibana/tasks');
    loadConfig(config,'./kibana/tasks/options/');
  }

  // pass the config to grunt
  grunt.initConfig(config);

};