(function () {
'use strict';

module.exports = function(grunt) {
grunt.initConfig({
  sass: {
    dist: {
      files: {
        './style/main.css': './style/main.scss'
      }
    }
  }
});


grunt.loadNpmTasks('grunt-contrib-sass');

grunt.registerTask('default', ['sass']);

};
}());
