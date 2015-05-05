/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */\n',
    // Task configuration.
    modernizr:{
      dist: {
        // [REQUIRED] Path to the build you're using for development. 
        "devFile" : "components/modernizr/modernizr.js",
        // Path to save out the built file. 
        "outputFile" : "js/modernizr-custom.min.js"
      }
    },
    //Construye el sitio en _site
    jekyll: {
      dist: {
        options: {
          src: '.',
          dest: '_site',
          config: '_config.yml',
          safe: true
        }
      }
    },
    //Levanta el server para ver lo de _site
    connect: {
    server: {
      options: {
        port: 4000,
        base: '_site'
      }
    }
  },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: false,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          $: true,
          skrollr: true,
          TweenLite: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js_source: {
        src: ['js-source/**/*.js']
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      utils: {
        src: ['js/modernizr-custom.min.js', 'components/jquery/dist/jquery.min.js','components/modernizr/modernizr.min.js'],
        dest: 'js/utils.min.js'
      },
      home: {
        src: ['js-source/site.js'],
        dest: 'js/concat/site.js'
      }
    },
copy:{
      jquerymap: {
        src: 'components/jquery/dist/jquery.min.map',
        dest: 'js/jquery.min.map'
      },
      normalize:{
        src: 'components/normalize.css/normalize.min.css',
        dest: 'css/normalize.min.css'
      } 
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      js_source: {
        files: [
      {
        src: 'js/concat/site.js',
        dest: 'js/site.min.js'
        }]
      }
    },
cssmin: {
  target: {
    files: [{
      expand: true,
      cwd: 'components/normalize.css/',
      src: ['*.css', '!*.min.css'],
      dest: 'components/normalize.css/',
      ext: '.min.css'
    }]
  }
},
    compass: {
      dist: {
        options: {
          sassDir: 'css-scss',
          cssDir: 'css',
          outputStyle: 'compressed'
        }
      },
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      markup: {
        files: ['index.html','_includes/*.html','_posts/*'],
        tasks: ['jekyll']
      },
      js_source: {
        files: '<%= jshint.js_source.src %>',
        tasks: ['jshint:js_source', 'concat:utils','concat:home', 'uglify:js_source', 'jekyll']
      },
      css_source: {
        files: '<%= compass.dist.options.sassDir %>/**/*.scss',
        tasks: ['compass:dist', 'jekyll']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //Build a custom modernizr file, with Modernizr.load
  grunt.loadNpmTasks("grunt-modernizr");
  //Jekyll
  grunt.loadNpmTasks('grunt-jekyll');
  //Server at http://localhost:4000
  grunt.loadNpmTasks('grunt-contrib-connect');
  // Default task.
  //grunt.registerTask('default', ['jshint', 'uglify:modernizr','concat', 'uglify', 'cssmin', 'compass','concat:site_css', 'watch']);
  grunt.registerTask('default', ['modernizr','jshint', 'concat', 'uglify', 'cssmin', 'copy', 'compass', 'jekyll', 'connect', 'watch']);

};
