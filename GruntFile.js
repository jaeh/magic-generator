module.exports = function(grunt) {
	var defaultRoot = grunt.option('deploy') ? '/' : 'file://' + process.cwd() + '/build/'
	  , rootPathUrl = grunt.option( 'rootPathUrl' ) || defaultRoot
	  , root = rootPathUrl
	  , static_dir = root + 'static/'
	  , img_dir = static_dir + 'img/';

	console.log('Grunt starting, server root = ' + rootPathUrl);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		stylus: {
			options: {
				define: {
					img_dir: img_dir
				}
			},
			compile: {
				files: {
					// compile and concat into single file
					'build/static/css/main.css': [
						'assets/css/reset.styl', 
						'assets/css/main.styl', 
						'assets/css/custom-widths.styl'
					]
				}
			}
		},
		jade: {
			compile: {
				options: {
					data: {
						debug: false
					  ,	root: root
					  ,	img_dir: img_dir
					  ,	static_dir: static_dir
					}
				},
				files: {
					'build/index.html': ['assets/jade/index.jade']
				}
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			basic: {
				src: ['assets/js/script.js'],
				dest: 'build/static/js/script.js',
			}
		},
		copy: {
			main: {
				files: [
					//copy static files
					{expand: true, cwd: 'assets/static/', src: ['**'], dest: 'build/static/'},
					{expand: false, src: ['favicon.ico'], dest: 'build/'}
				]
			}
		}
	});

	// Load the plugin that provides the 'stylus' task.
	grunt.loadNpmTasks('grunt-contrib-stylus');

	// Load the plugin that provides the 'jade' task.
	grunt.loadNpmTasks('grunt-contrib-jade');

	// Load the plugin that provides the 'concat' task.
	grunt.loadNpmTasks('grunt-contrib-concat');

	//used to copy the images and static files to the build directory
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', ['stylus', 'jade', 'concat', 'copy']);
};

